/* 
    Auth Routes 
    Host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');

const { registerUser, loginUser, revalidatedTokens } = require('../controllers/auth');
const fieldsValidators = require('../middlewares/fieldsValidator');
const jwtValidator = require('../middlewares/jwtValidator');

const router = express.Router();

router.post(
    '/register',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password', 'the password must be at least 8 characters').isLength({ min: 8 }),
        fieldsValidators
    ],
    registerUser
)
router.post(
    '/',
    [
        check('email', 'email is required').isEmail(),
        check('password', 'the password must be at least 8 characters').isLength({ min: 8 }),
        fieldsValidators
    ],
    loginUser
)
router.get('/renew', jwtValidator, revalidatedTokens)

module.exports = router;