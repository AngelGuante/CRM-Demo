const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { getTokenPayload } = require('../libs/jwt.js')
const { SignedInUsers } = require('../Utils/staticsVariables.js');

class ProductsService {
    async Insert(req) {
        try {
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

            const payload = getTokenPayload(req.headers['authorization']);
            if (payload) {
                const userSigned = SignedInUsers.find(x => x['id'] == payload['sub']);
                if (userSigned) {
                    //Validate id product exist on the all branches offices of one company
                    const [productExist] = await sequelize.query(`
                SELECT P.code
                FROM branch_office BO
                RIGHT JOIN branch_office_product BOP ON BOP.branch_office_id = BO.id
                RIGHT JOIN product P ON P.id = BOP.product_id
                WHERE company_id = ${userSigned['company_id']}`);

                    if (!productExist.find(x => x['code'] === dataFormated.code)) {
                        const product = await models.product.create(dataFormated);
                        if (product) {
                            await models.branch_office_product.create({
                                branch_office_id: userSigned['branch_office'],
                                product_id: product["id"],
                                cost: dataFormated.cost || 0,
                                price: dataFormated.price || 0,
                                quantity: 0
                            });

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
                                "message": "Error creating product"
                            };
                    }
                    else
                        return {
                            "status": 406,
                            "title": "Not Aceptable",
                            "message": "Product Exists"
                        };
                }
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
}

module.exports = { ProductsService };