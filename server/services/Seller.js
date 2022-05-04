const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { Op } = require("sequelize");
const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { SelectsTotalRegists, MaxContactsPerEntity } = require('../Utils/staticsVariables.js');

const nameEntity = 'Seller';

class SellerService {
    async Select(req) {
        const data = req.query;
        const searchResult = await models.seller.findAll({
            offset: data['offset'] * SelectsTotalRegists,
            limit: SelectsTotalRegists,
            attributes: [['seller_customer_status_id', 'status'], 'code', 'name'],
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
                branch_office_id: userSigned['company_id'],
                code: data.code.toLowerCase(),
                name: data.name.toLowerCase()
                // contacts: data.contacts
            }

            //Validate if seller have less or equals the limit of seller contacts
            if (dataFormated['contacts'] && dataFormated['contacts'].length && Number(dataFormated['contacts'].length) > MaxContactsPerEntity)
                return {
                    "status": 406,
                    "title": "Not Aceptable",
                    "message": `Seller can't have more than ${MaxContactsPerEntity} contacts`
                };

            if (userSigned) {
                //Validate if seller exist on the all branches offices of one company
                const [codeExist] = (await sequelize.query(`SELECT S.code
                                                            FROM 
                                                            branch_office BO 
                                                            JOIN seller_branch_office SBO ON SBO.branch_office_id = BO.id
                                                            JOIN seller S ON S.id = SBO.seller_id
                                                            WHERE S.code = '${dataFormated['code']}'
                                                            AND company_id = ${userSigned['company_id']}`))[0];

                if (!codeExist) {
                    const seller = await models.seller.create({
                        code: dataFormated['code'],
                        name: dataFormated['name'],
        
                        contacts: dataFormated['contacts']
                    });

                    if (seller) {
                        await models.seller_branch_office.create({
                            seller_id: seller['id'],
                            branch_office_id: dataFormated['branch_office_id']
                        });

                        //If a contact is specified, we save them
                        if (dataFormated['contacts'] && dataFormated['contacts'].length) {
                            dataFormated['contacts'].forEach(async x => {
                                await models.seller_contact.create({
                                    contact_type_id: x['type'],
                                    seller_id: seller['dataValues']['id'],
                                    contact: x['contact'].toLowerCase(),
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
                            "message": `Error creating ${nameEntity}`
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

    async Update(req) {
        try {
            const userSigned = GetUserSigned(req);
            const data = req.body;
            const dataFormated = {
                seller_customer_status_id: data.status,
                code: data.code.toLowerCase(),
                name: data.name.toLowerCase(),

                contacts: data.contacts
            };

            //Get seller to update
            const entity = await models.seller_branch_office.findOne({
                where: {
                    branch_office_id: userSigned['company_id']
                },
                include: [
                    {
                        model: models.seller, as: 'seller',
                        where: {
                            code: dataFormated.code
                        }
                    }
                ]
            });

            if (entity)
                //Update entity
                await entity.seller.update({
                    seller_customer_status_id: dataFormated['seller_customer_status_id'],
                    name: dataFormated['name']
                });
            else {
                return {
                    "status": 204,
                    "title": "No Content",
                    "message": `${nameEntity} not found`
                }
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
}

module.exports = SellerService;