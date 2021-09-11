const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const generateJwt = require("../helpers/jwt");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email });


        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is already registered, use another'
            })
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJwt(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'incorrect username or password'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password, try again'
            })
        }

        const token = await generateJwt(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
}

const revalidatedTokens = async (req, res) => {

    const uid = req.uid
    const name = req.name

    const token = await generateJwt(uid, name);

    res.json({
        ok: true,
        token,
        uid,
        name
    })
}

module.exports = {
    registerUser,
    loginUser,
    revalidatedTokens
}