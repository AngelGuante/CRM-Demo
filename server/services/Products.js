const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { Op } = require("sequelize");
const { GetUserSigned, MoneyToNumber } = require('../Utils/staticsMethods.js');
const { SelectsTotalRegists } = require('../Utils/staticsVariables.js');

const nameEntity = 'Product';

class ProductsService {
    async Select(req) {
        const userSigned = GetUserSigned(req);
        const data = req.query;

        const searchResult = await models.branch_office_product.findAll({
            offset: data['offset'] * SelectsTotalRegists,
            limit: SelectsTotalRegists,
            attributes: [],
            where: {
                branch_office_id: userSigned['branch_office']
            },
            include: [
                {
                    model: models.product, as: 'product',
                    attributes: [['product_status_id', 'status'], ['product_type_id', 'type'], 'code', 'description'],
                    where: {
                        code:
                        {
                            [Op.like]: `%${data['code']}%`
                        },
                        description:
                        {
                            [Op.like]: `%${data['description']}%`
                        }
                    }
                }
            ]
        });

        if (searchResult.length)
            return {
                "status": 200,
                "title": "Success",
                "message": searchResult
            };

        return {
            "status": 204,
            "title": "No Content",
            "message": `No ${nameEntity} found`
        };
    }

    async Insert(req) {
        try {
            const userSigned = GetUserSigned(req);
            const data = req.body;
            const dataFormated = {
                product_type_id: data.type,
                code: data.code.toLowerCase(),
                description: data.description.toLowerCase(),

                cost: data.cost,
                price: data.price
            }

            //If cost or price have value, so, both cost and price shoud have value.
            if ((dataFormated.cost || dataFormated.price) &&
                !(dataFormated.cost && dataFormated.price))
                return {
                    "status": 400,
                    "title": "Bad Request",
                    "message": "ValidationError: 'cost' and 'price' should have a valid value"
                };

            if (userSigned) {
                //Validate id product exist on the all branches offices of one company
                const [productExist] = (await sequelize.query(`SELECT P.code
                                                               FROM branch_office BO
                                                               RIGHT JOIN branch_office_product BOP ON BOP.branch_office_id = BO.id
                                                               RIGHT JOIN product P ON P.id = BOP.product_id
                                                               WHERE P.code = '${dataFormated['code']}'
                                                               AND company_id = ${userSigned['company_id']}`))[0];

                if (!productExist) {
                    const product = await models.product.create(dataFormated);
                    if (product) {
                        const productCreated = await models.branch_office_product.create({
                            branch_office_id: userSigned['branch_office'],
                            product_id: product["id"],
                            cost: dataFormated.cost || 0,
                            price: dataFormated.price || 0,
                            quantity: 0
                        });

                        await this.SaveProductHistory(
                            userSigned,
                            {
                                id: productCreated['dataValues']['product_id'],
                                price: 0,
                                cost: 0
                            },
                            'all',
                            'Created');

                        return {
                            "status": 201,
                            "title": "Created",
                            "message": product
                        };
                    }
                    else
                        return {
                            "status": 500,
                            "title": "Error",
                            "message": `Error creating ${nameEntity}`
                        };
                }
                else
                    return {
                        "status": 406,
                        "title": "Not Aceptable",
                        "message": `${nameEntity} Exists`
                    };
            }
        } catch (error) {
            return {
                "status": 500,
                "title": "Server Error",
                "message": `{
                    "Error": ${error["parent"] || error},
                }`
            }
        }
    }

    async Update(req) {
        const userSigned = GetUserSigned(req);
        try {
            const data = req.body;
            const dataFormated = {
                product_status_id: data.status,
                product_type_id: data.type,
                code: data.code.toLowerCase(),
                description: data.description.toLowerCase(),

                price: data.price
            };

            //Get branch_office_product and product to update
            const tables = await models.branch_office_product.findOne({
                where: { branch_office_id: userSigned['branch_office'] },
                include: [
                    {
                        model: models.product, as: 'product',
                        where: { code: dataFormated.code }
                    }
                ]
            });

            if (!tables || !tables['product'])
                return {
                    "status": 204,
                    "title": "No Content",
                    "message": `${nameEntity} not found`
                }

            //Save a backup of resultset because we need to use it after update and need work with old data.
            const tablesBK = { price: tables.price };

            //Cost can't be greater than price
            if (MoneyToNumber(tables.cost) > dataFormated.price)
                return {
                    "status": 400,
                    "title": "Bad Request",
                    "message": "ValidationError: 'price' should be greater than 'cost'"
                }

            //Update entities
            await tables['product'].update({
                product_status_id: dataFormated.product_status_id,
                product_type_id: dataFormated.product_type_id,
                description: dataFormated.description,
            });
            await tables.update({
                price: dataFormated.price
            });

            //Save history of change of product price if it was updated
            if (MoneyToNumber(tablesBK.price) != dataFormated.price) {
                await this.SaveProductHistory(
                    userSigned,
                    {
                        id: tables['product'].id,
                        price: dataFormated.price,
                        createdby_user_id: userSigned['id']
                    },
                    'price');
            }

            return {
                "status": 200,
                "title": "Success",
                "message": `${nameEntity} update successful`
            }
        } catch (error) {
            return {
                "status": 500,
                "title": "Server Error",
                "message": `{
                    "Error": ${error["parent"] || error},
                }`
            }
        }
    }

    async SaveProductHistory(userSigned, product, priceOrCost, noterefernce) {
        //Save history of change of product price
        if (priceOrCost === 'all' || priceOrCost === 'price')
            await models.history_changes_product_price.create({
                product_id: product['id'],
                newprice: product['price'],
                createdby_user_id: userSigned['id'],
                branch_office_id: userSigned['branch_office']
            });

        //Save history of change of product cost
        if (priceOrCost === 'all' || priceOrCost === 'cost')
            await models.history_changes_product_cost.create({
                product_id: product['id'],
                newcost: product['cost'],
                createdby_user_id: userSigned['id'],
                branch_office_id: userSigned['branch_office'],
                noterefernce: noterefernce
            });
    }
}

module.exports = { ProductsService };