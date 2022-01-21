const { models } = require('../libs/sequelize.js');
const { getTokenPayload } = require('../libs/jwt.js')
const { SignedInUsers } = require('../Utils/staticsVariables.js');

class ProductsService {
    async Insert(req)  {
        const data = req.body;
        const dataFormated = {
            product_status_id: data.status,
            product_type_id: data.type,
            code: data.code.toLowerCase(),
            description: data.description.toLowerCase()
        }
        
        //Validate id product exist on the all branches offices of one company
        const productExist = await models.product.findOne({
            where: { code: dataFormated.code },
            attributes: ['id']         
        });

        const payload = getTokenPayload(req.headers['authorization']);
        if(payload) {
            const userSigned = SignedInUsers.find(x => x['id'] == payload['sub']);


                //         const productExist2 = await models.branch_office.findAll({
        //                 where: { company_id: userSigned['company_id'] },
        //                 attributes: ['id'],
        //                 include: [
        //                     {
        //                         models: models.branch_office_product, as: 'branch_office_product'
        //                     }
        //                 ] 
        //             });
        //         console.log(productExist2);

            if(userSigned) {
                if(!productExist) {
                    const product = await models.product.create(dataFormated);
                    if(product){
                        await models.branch_office_product.create({
                            branch_office_id: userSigned['branch_office'],
                            product_id: product["id"],
                            cost: 0,
                            price: 0,
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
    }
}

module.exports = { ProductsService };