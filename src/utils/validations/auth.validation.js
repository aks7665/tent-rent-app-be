const validateHelper = require('../helpers/validation.helper')
const joi = require('joi');

exports.validateLogin = async (req) => {
    let schema = joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required()
    });
    return await validateHelper.validateSchema(req.body, schema);
};