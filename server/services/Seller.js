const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { Op } = require("sequelize");
const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { SelectsTotalRegists } = require('../Utils/staticsVariables.js');

class SellerService {
    async Select(req) {
        const data = req.query;
        const searchResult = await models.seller.findAll({
            offset: data['offset'] * SelectsTotalRegists,
            limit: SelectsTotalRegists,
            attributes: [['seller_client_status_id', 'status'], 'code', 'name'],
            where: {
                code: {
                    [Op.like]: `%${data['code']}%`
                },
                name: {
                    [Op.like]: `%${data['name']}%`
                }
            }
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
            "message": "No seller found"
        };
    }
    
    async Insert(req) {
        try {
            const userSigned = GetUserSigned(req);
            const data = req.body;
            const dataFormated = {
                seller_client_status_id: data.status,
                branch_office_id: userSigned['company_id'],
                code: data.code.toLowerCase(),
                name: data.name.toLowerCase(),

                contacts: data.contacts
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
                    
                    if (seller) {
                        //If a contact is specified, we save them
                        if(dataFormated['contacts'] && dataFormated['contacts'].length) {
                            dataFormated['contacts'].forEach(async x => {
                                await models.seller_contact.create({
                                    contact_type_id: x['type'],
                                    seller_id: seller['dataValues']['id'],
                                    contact: x['contact'],
                                });
                            })
                        }

                        return {
                            "status": 201,
                            "title": "Created",
                            "message": seller
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