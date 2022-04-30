const { getTokenPayload } = require('../libs/jwt.js');
const { SignedInUsers } = require('../Utils/staticsVariables.js');

const MoneyToNumber = money =>
    Number(money.replace(/[^0-9.-]+/g,""));

const GetUserSigned = req => {
    const payload = getTokenPayload(req.headers['authorization']);
    if(payload){
        const userSigned = SignedInUsers.find(x => x['id'] == payload['sub'])
        if(userSigned)
            return userSigned;
    }
    return;
}

module.exports = { MoneyToNumber, GetUserSigned };