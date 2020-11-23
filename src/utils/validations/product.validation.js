const validateHelper = require('../helpers/validation.helper')
const joi = require('joi');

exports.validateCreate = async (req) => {
    let schema = joi.object().keys({
        title: joi.string().required(),
        price: joi.number().required(),
        quantity: joi.number().required(),
        booked: joi.number().optional(),
    });
    return await validateHelper.validateSchema(req.body, schema);
};