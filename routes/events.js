const express = require('express');
const { check } = require('express-validator');

const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const isDate = require('../helpers/isDate');
const fieldsValidators = require('../middlewares/fieldsValidator');
const jwtValidator = require('../middlewares/jwtValidator');

const router = express.Router();

router.use(jwtValidator);

router.get('/', getEvents);

router.post('/', [
    check('title', 'title is required').not().isEmpty(),
    check('start', 'start date is required').custom(isDate),
    check('end', 'end date is required').custom(isDate),
    fieldsValidators
], createEvent);

router.put('/:id',[
    check('title', 'title is required').not().isEmpty(),
    check('start', 'start date is required').custom(isDate),
    check('end', 'end date is required').custom(isDate),
    fieldsValidators
], updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router