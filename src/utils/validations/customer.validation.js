const validateHelper = require('../helpers/validation.helper')
const joi = require('joi');

exports.validateCreate = async (req) => {
    let schema = joi.object().keys({
        name: joi.string().required()
    });
    return await validateHelper.validateSchema(req.body, schema);
};

exports.validateCreateMany = async (req) => {
    let schema = joi.object().keys({
        name: joi.string().required()
    });
    return await validateHelper.validateSchema(req.body, schema);
};