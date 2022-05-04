const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { Op } = require("sequelize");
const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { SelectsTotalRegists, MaxContactsPerEntity } = require('../Utils/staticsVariables.js');

const nameEntity = 'Customer';

class CustomerService {
    async Select(req) {
        //---------
        //- TO DO -
        //---------
        //Solamente traer los que estan con estado 1
        const data = req.query;
        const searchResult = await models.customer.findAll({
            offset: data['offset'] * SelectsTotalRegists,
            limit: SelectsTotalRegists,
            attributes: [['seller_customer_status_id', 'status'], 'document', 'name', 'lastname'],
            where: {
                document: {
                    [Op.like]: `%${data['document']}%`
                },
                name: {
                    [Op.like]: `%${data['name']}%`
                },
                lastname: {
                    [Op.like]: `%${data['lastname']}%`
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
            "message": `No ${nameEntity} found`
        };
    }

    async Insert(req) {
        try {
            const userSigned = GetUserSigned(req);
            const data = req.body;
            const dataFormated = {
                branch_office_id: userSigned['company_id'],
                document: data['document'].toLowerCase(),
                name: data['name'].toLowerCase(),
                lastname: data['lastname'].toLowerCase(),

                contacts: data['contacts']
            }

            //Validate if customer have less or equals the limit of seller contacts
            if (dataFormated['contacts'] && dataFormated['contacts'].length && Number(dataFormated['contacts'].length) > MaxContactsPerEntity)
                return {
                    "status": 406,
                    "title": "Not Aceptable",
                    "message": `Customer can't have more than ${MaxContactsPerEntity} contacts`
                };

            if (userSigned) {
                //Validate if customer exist on any branches offices of one company
                const [documentExist] = (await sequelize.query(`SELECT C.document
                                                                FROM 
                                                                branch_office BO 
                                                                JOIN customer C ON BO.id = C.Branch_office_id
                                                                WHERE C.document = '${dataFormated['document']}'
                                                                AND company_id = ${userSigned['company_id']}`))[0];

                if (!documentExist) {
                    const customer = await models.customer.create({
                        branch_office_id: dataFormated['branch_office_id'],
                        document: dataFormated['document'],
                        name: dataFormated['name'],
                        lastname: dataFormated['lastname'],
                        seller_customer_status_id: 1
                    });

                    //If a contact is specified, we save them
                    if (dataFormated['contacts'] && dataFormated['contacts'].length) {
                        dataFormated['contacts'].forEach(async x => {
                            await models.customer_contact.create({
                                contact_type_id: x['type'],
                                customer_id: customer['dataValues']['id'],
                                contact: x['contact'].toLowerCase(),
                            });
                        })
                    }

                    return {
                        "status": 201,
                        "title": "Created",
                        "message": customer
                    }
                }
                else
                    return {
                        "status": 406,
                        "title": "Not Aceptable",
                        "message": `${nameEntity} Exists`
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
                seller_customer_status_id: data['status'],
                document: data['document'].toLowerCase(),
                name: data['name'].toLowerCase(),
                lastname: data['lastname'].toLowerCase(),
            };

            //Get custpmer to update
            const entity = await models.customer.findOne({
                where: {
                    branch_office_id: userSigned['company_id'],
                    document: dataFormated['document']
                }
            });

            if (entity)
                //Update entity
                await entity.update({
                    seller_customer_status_id: dataFormated['seller_customer_status_id'],
                    name: dataFormated['name'],
                    lastname: dataFormated['lastname'],
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

module.exports = CustomerService;