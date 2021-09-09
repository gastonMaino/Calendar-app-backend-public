const jwt = require('jsonwebtoken')

const jwtValidator = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'There is no token in the request'
        })
    }

    try {
        const {uid, name} = jwt.verify(token, process.env.SECRET_JTW_SEED)

        req.uid = uid
        req.name = name
        
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token'
        })
    }
    

    next()
}

module.exports = jwtValidator