const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { MaxContactsPerEntity } = require('../Utils/staticsVariables.js');

const nameEntity = 'Customer Contact';

class CustomerContactService {
    async Select(req) {
        const userSigned = GetUserSigned(req);
        const data = req.query;
        const searchResult = await models.customer_contact.findAll({
            attributes: [['contact_type_id', 'type'], 'contact'],
            include: [
                {
                    model: models.customer, as: 'customer',
                    attributes: [],
                    where: {
                        branch_office_id: userSigned['company_id'],
                        document: data['document']
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
                document: data.document.toLowerCase(),

                contacts: data.contacts
            }

            //Query to get Id of customer and count of customer contacts to avoid set more than limit customer can have
            const customer = (await sequelize.query(`SELECT COUNT(CC.*) totalCustomerContacts, C.id
                                            FROM customer_contact CC 
                                            RIGHT JOIN Customer C ON C.id = CC.Customer_id
                                            WHERE C.branch_office_id = ${userSigned['company_id']}
                                            AND C.document = '${dataFormated['document']}'
                                            GROUP BY C.Id`))[0][0];
            if (customer) {
                if ((Number(customer['totalcustomercontacts']) + dataFormated['contacts'].length) > MaxContactsPerEntity)
                    return {
                        "status": 406,
                        "title": "Not Aceptable",
                        "message": `${nameEntity} can't have more than ${MaxContactsPerEntity} contacts`
                    };
                else
                    dataFormated['contacts'].forEach(async x => {
                        await models.customer_contact.create({
                            contact_type_id: x['type'],
                            customer_id: customer['id'],
                            contact: x['contact'].toLowerCase(),
                        });
                    });

                return {
                    "status": 201,
                    "title": "Created",
                    "message": `${dataFormated['contacts'].length} ${nameEntity} created`
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

    async Delete(req) {
        try {
            const userSigned = GetUserSigned(req);
            const data = req.body;
            const dataFormated = {
                document: data.document.toLowerCase(),

                contact: data.contact
            };

            //Get customer_contact to delete
            const tableData = await models.customer_contact.findOne({
                where: { contact: dataFormated['contact'] },
                include: [
                    {
                        model: models.customer, as: 'customer',
                        where: {
                            branch_office_id: userSigned['company_id'],
                            document: dataFormated['document']
                        }
                    }
                ]
            });

            if (tableData)
                //Delete entity
                await models.customer_contact.destroy({
                    where: { id: tableData['dataValues']['id'] }
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
                "message": `${nameEntity} deleted successful`
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

module.exports = CustomerContactService;