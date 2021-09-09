const jwt = require('jsonwebtoken');

const generateJwt = (uid, name) => {
    return new Promise((res, rej) => {
        const payload = { uid, name }

        jwt.sign(payload, process.env.SECRET_JTW_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                rej('The token could not be generated');
            }

            res(token);
        })
    })
}

module.exports = generateJwt