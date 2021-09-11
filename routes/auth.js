/* 
    Auth Routes 
    Host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');

const { registerUser, loginUser, revalidatedTokens } = require('../controllers/auth');
const validatePasswordModerate = require('../helpers/isPassword');
const fieldsValidators = require('../middlewares/fieldsValidator');
const jwtValidator = require('../middlewares/jwtValidator');

const router = express.Router();

router.post(
    '/register',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password', 'the password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long').custom(validatePasswordModerate),
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