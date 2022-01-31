const { models } = require('../libs/sequelize.js');
const { GetUserSigned } = require('../Utils/staticsMethods.js');

const nameEntity = 'Seller Contact';

class SellerService {
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