const { models } = require('../libs/sequelize.js');
const { Op } = require("sequelize");
const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { ProductsService } = require('../services/Products.js');
const { AmountOnAccountService } = require('../services/AmountOnAccount.js')

const service = new ProductsService();
const amountOnAccountService = new AmountOnAccountService();

class SellerService {
    async Insert(req) {
        try {
            const userSigned = GetUserSigned(req);
            const dataFormated = {
                code: req.body['code'].toLowerCase(),
                status: req.body['status'],
                amount: req.body['amount'],

                products: req.body['products']
            }

            //********************************************************************** */
            //                              Validations
            //********************************************************************** */

            //Validate if the seller exists
            const seller = await models.seller_branch_office.findAll({
                attributes: ['branch_office_id'],
                include: [
                    {
                        model: models.branch_office, as: 'branch_office',
                        attributes: [],
                        where: {
                            company_id: userSigned['company_id']
                        },
                    },
                    {
                        model: models.seller, as: 'seller',
                        attributes: ['id', 'code'],
                        where: {
                            code: dataFormated.code
                        }
                    }
                ]
            });

            if (!seller.length)
                return {
                    "status": 406,
                    "title": "Not Aceptable",
                    "message": `Seller not exists on any branch office`
                };

            //Validate if some product is not exist on any branch office
            const productsOnInvoiceBuy = await models.branch_office_product.findAll({
                attributes: ['cost', 'quantity', 'branch_office_id'],
                include: [
                    {
                        model: models.branch_office, as: 'branch_office',
                        attributes: [],
                        where: {
                            company_id: userSigned['company_id']
                        },
                    },
                    {
                        model: models.product, as: 'product',
                        attributes: ['id', 'code'],
                        where: {
                            code: {
                                [Op.in]: dataFormated.products.map(x => x['product'])
                            }
                        }
                    }
                ]
            });

            let productNotExist = [];
            dataFormated.products.map(x => x['product']).forEach(x => {
                if (!productsOnInvoiceBuy.some(y => y['dataValues']['product']['dataValues']['code'] == x))
                    productNotExist.push(x);
            });

            if (productNotExist.length)
                return {
                    "status": 406,
                    "title": "Not Aceptable",
                    "message": `Products '${productNotExist}' not exists on any branch office `
                };

            //********************************************************************** */
            //            Adding entities to current branch if is necessary
            //********************************************************************** */

            //If seller exists only in another branch of the same company, create the seller on this branch
            if (!seller.some(x => x['dataValues']['branch_office_id'] == userSigned['branch_office']))
                await models.seller_branch_office.create({
                    seller_id: seller[0]['dataValues']['seller']['id'],
                    branch_office_id: userSigned['branch_office']
                });

            //If product exists only in another branch of the same company, create the product on this branch
            dataFormated.products.forEach(async x => {
                if (!productsOnInvoiceBuy.some(poi => poi['dataValues']['branch_office_id'] == userSigned['branch_office'])) {
                    const productData = productsOnInvoiceBuy.find(y => y['dataValues']['product']['dataValues']['code'] == x['product']);

                    await models.branch_office_product.create({
                        branch_office_id: userSigned['branch_office'],
                        product_id: productData['dataValues']['product']['id'],
                        cost: 0,
                        price: 0,
                        quantity: 0
                    });

                    await service.SaveProductHistory(userSigned, { 'id': productData['dataValues']['product']['id'], 'cost': 0 }, 'cost', 'first buy');
                }
            });

            //********************************************************************** */
            //                              Saving all
            //********************************************************************** */

            //Get last IdentifierNumber on invoice_buy in the branch office
            let IdentifierNumber = await models.invoice_buy.findOne({
                attributes: ['identifiernumber'],
                order: [['createdat', 'DESC']],
                limit: 1,
                offset: 0,
                where: {
                    branch_office_id: userSigned['branch_office']
                }
            });

            //Save invoice Buy
            const invoicebuyCreated = await models.invoice_buy.create({
                invoice_type_id: 1,
                invoice_status_id: dataFormated.status,
                createdby_user_id: userSigned['id'],
                createdfor_seller_id: seller[0]['seller']['dataValues']['id'],
                branch_office_id: userSigned['branch_office'],
                identifiernumber: IdentifierNumber ? ++IdentifierNumber['dataValues']['identifiernumber'] : 1000
            });

            //Save details of products on invoice buy
            dataFormated.products.forEach(async x => {
                const product = productsOnInvoiceBuy.find(item => item['dataValues']['product']['dataValues']['code'] === x['product'] && item['dataValues']['branch_office_id'] == userSigned['branch_office']);

                await models.invoice_buy_product_detail.create({
                    invoice_buy_id: invoicebuyCreated['id'],
                    product_id: product['product']['dataValues']['id'],
                    amount: x['amount'],
                    quantity: x['quantity'],
                    quantitybeforeinvoice: product['dataValues']['quantity'],
                    costoninvoice: product['dataValues']['cost']
                });

                //Update quantity and Cost on Branch_Office_Product
                const branch_office_product = await models.branch_office_product.findOne({
                    where: {
                        product_id: product['product']['dataValues']['id'],
                        branch_office_id: userSigned['branch_office']
                    }
                });

                // if cost is different, then, save the history of cost change
                let productData = {
                    quantity: branch_office_product['dataValues']['quantity'] + x['quantity']
                };

                if (product['dataValues']['cost'] !== x['amount']) {
                    // -------
                    // -TO DO-
                    // -------
                    // *. Averiguar la formular para cuando el se quiera cambiar codigo del producto de manera automatica.
                    productData.cost = x['amount'];
                    await service.SaveProductHistory(userSigned, { 'id': product['product']['dataValues']['id'], 'cost': x['amount'] }, 'cost', `buy-change-${invoicebuyCreated['id']}`);
                }

                await branch_office_product.update(productData);
            });

            // If status of invoice is paid
            if (dataFormated.status === 1)
                // Save Petty Cash total of invoice
                await amountOnAccountService.Insert({ 'branch_office_id': userSigned['branch_office'], 'amount': dataFormated.amount });

            return {
                "status": 201,
                "title": "Created",
                "message": `created`
            };
        }
        catch (error) {
            return {
                "status": 500,
                "title": "Server Error",
                "message": `{
                    "Error": ${error["parent"] || error},
                }`
            }
        }
    }
}

module.exports = SellerService