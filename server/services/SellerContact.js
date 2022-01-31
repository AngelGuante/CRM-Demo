const { models } = require('../libs/sequelize.js');
const sequelize = require('../libs/sequelize.js');
const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { MaxContactsPerEntity } = require('../Utils/staticsVariables.js');

const nameEntity = 'Seller Contact';

class SellerService {
    async Insert(req) {
        try {
            const userSigned = GetUserSigned(req);
            const data = req.body;
            const dataFormated = {
                code: data.code.toLowerCase(),

                contacts: data.contacts
            }

            //Query to get Id of seller and count of seller contacts to avoid set more than limit seller can have
            const seller = (await sequelize.query(`SELECT COUNT(*) totalSellerContacts, S.id
                                            FROM seller_contact SC 
                                            JOIN Seller S ON S.id = SC.seller_id
                                            WHERE S.branch_office_id = ${userSigned['company_id']}
                                            AND S.code = '${dataFormated['code']}'
                                            GROUP BY S.Id`))[0][0];
            if (seller) {
                if ((Number(seller['totalsellercontacts']) + dataFormated['contacts'].length) > MaxContactsPerEntity)
                    return {
                        "status": 406,
                        "title": "Not Aceptable",
                        "message": `Seller can't have more than ${MaxContactsPerEntity} contacts`
                    };
                else
                    dataFormated['contacts'].forEach(async x => {
                        await models.seller_contact.create({
                            contact_type_id: x['type'],
                            seller_id: seller['id'],
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
                code: data.code.toLowerCase(),

                contact: data.contact
            };

            //Get seller_contact to delete
            const tableData = await models.seller_contact.findOne({
                where: { contact: dataFormated['contact'] },
                include: [
                    {
                        model: models.seller, as: 'seller',
                        where: {
                            branch_office_id: userSigned['company_id'],
                            code: dataFormated['code']
                        }
                    }
                ]
            });

            if (tableData)
                //Delete entity
                await models.seller_contact.destroy({
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

module.exports = SellerService;