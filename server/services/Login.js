const { signToken } = require('../libs/jwt.js');

class LoginService {
    SignIn(data) {
        if(data.user == 'msuero' && data.pass == '123') {
            const payload = {
                sub: 68,
                role: 'Demo Role'
            };
            return signToken(payload);
        }
        return;
    }
}

module.exports = { LoginService };