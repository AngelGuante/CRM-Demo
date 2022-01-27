const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { GetUserSigned } = require('../Utils/staticsMethods.js');

class SellerService {
    async Insert(req) {
        try {
            const userSigned = GetUserSigned(req);
            const data = req.body;
            const dataFormated = {
                seller_client_status_id: data.status,
                branch_office_id: userSigned['company_id'],
                code: data.code.toLowerCase(),
                name: data.name.toLowerCase(),
            }

            if (userSigned) {
                //Validate if seller exist on the all branches offices of one company
                const [codeExist] = (await sequelize.query(`SELECT S.code
                                                       FROM branch_office BO
                                                       RIGHT JOIN seller S ON S.branch_office_id = BO.id
                                                       WHERE S.code = '${dataFormated['code']}'
                                                       AND company_id = ${userSigned['company_id']}`))[0];
                if (!codeExist) {
                    const seller = await models.seller.create(dataFormated);

                    if (seller)
                        return {
                            "status": 201,
                            "title": "Created",
                            "message": seller
                        };
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
                        "message": "Seller Exists"
                    };
            }
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

module.exports = SellerService;