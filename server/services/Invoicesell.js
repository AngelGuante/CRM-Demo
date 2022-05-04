const { models } = require('../libs/sequelize.js');
const { Op } = require("sequelize");
const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { AmountOnAccountService } = require('../services/AmountOnAccount.js');

const amountOnAccountService = new AmountOnAccountService();

// TO DO
// Agruoar cosas que se usan iguales en Invoicebuy e InvoiceSell

class InvoiceSellService {
    async Insert(req) {
        try {
            const userSigned = GetUserSigned(req);
            const dataFormated = {
                document: req.body['document'].toLowerCase(),
                status: req.body['status'],
                amount: req.body['amount'],

                products: req.body['products']
            }

            //********************************************************************** */
            //                              Validations
            //********************************************************************** */

            //Validate if the customer exists
            const customer = await models.customer.findAll({
                attributes: ['id'],
                include: [
                    {
                        model: models.branch_office, as: 'branch_office',
                        attributes: [],
                        where: {
                            company_id: userSigned['company_id']
                        },
                    }
                ]
            });

            if (!customer.length)
                return {
                    "status": 406,
                    "title": "Not Aceptable",
                    "message": `Seller not exists on any branch office`
                };

            //Validate if some product is not exist on any branch office
            const productsOnInvoiceSell = await models.branch_office_product.findAll({
                attributes: ['cost', 'price', 'quantity', 'branch_office_id'],
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
                if (!productsOnInvoiceSell.some(y => y['dataValues']['product']['dataValues']['code'] == x))
                    productNotExist.push(x);
            });

            if (productNotExist.length)
                return {
                    "status": 406,
                    "title": "Not Aceptable",
                    "message": `Products '${productNotExist}' not exists on any branch office `
                };

            //Validate if quantity of all product are less than the quantity on inventory
            let productInvalidAmount = [];
            dataFormated.products.forEach(async x => {
                const product = productsOnInvoiceSell.find(item => item['dataValues']['product']['dataValues']['code'] === x['product'] && item['dataValues']['branch_office_id'] == userSigned['branch_office']);

                if (x['quantity'] > product['dataValues']['quantity'])
                    productInvalidAmount.push(x['product']);
            });

            if (productInvalidAmount.length)
                return {
                    "status": 406,
                    "title": "Not Aceptable",
                    "message": `Products '${productInvalidAmount}' can't be selled `
                };

            //********************************************************************** */
            //                              Saving all
            //********************************************************************** */

            //Get last IdentifierNumber on invoice_sell in the branch office
            let IdentifierNumber = await models.invoice_sell.findOne({
                attributes: ['identifiernumber'],
                order: [['createdat', 'DESC']],
                limit: 1,
                offset: 0,
                where: {
                    branch_office_id: userSigned['branch_office']
                }
            });

            //Save invoice Sell
            const invoicesellCreated = await models.invoice_sell.create({
                invoice_type_id: 1,
                invoice_status_id: dataFormated.status,
                createdby_user_id: userSigned['id'],
                createdfor_customer_id: customer[0]['dataValues']['id'],
                branch_office_id: userSigned['branch_office'],
                amount: dataFormated['amount'],
                identifiernumber: IdentifierNumber ? ++IdentifierNumber['dataValues']['identifiernumber'] : 1000
            });

            //Save details of products on invoice sell
            dataFormated.products.forEach(async x => {
                const product = productsOnInvoiceSell.find(item => item['dataValues']['product']['dataValues']['code'] === x['product'] && item['dataValues']['branch_office_id'] == userSigned['branch_office']);

                await models.invoice_sell_product_detail.create({
                    invoice_id: invoicesellCreated['id'],
                    product_id: product['product']['dataValues']['id'],
                    amount: x['amount'],
                    quantity: x['quantity'],
                    quantitybeforeinvoice: product['dataValues']['quantity'],
                    costoninvoice: product['dataValues']['cost'],
                    priceoninvoice: product['dataValues']['price']
                });

                //Update quantity and Cost on Branch_Office_Product
                const branch_office_product = await models.branch_office_product.findOne({
                    where: {
                        product_id: product['product']['dataValues']['id'],
                        branch_office_id: userSigned['branch_office']
                    }
                });

                let productData = {
                    quantity: branch_office_product['dataValues']['quantity'] - x['quantity']
                };

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

module.exports = InvoiceSellService