const validateHelper = require('../helpers/validation.helper')
const joi = require('joi');

exports.validateCreate = async (req) => {
    let schema = joi.object().keys({
        customerId: joi.string().length(24).required(),
        productId: joi.string().length(24).required(),
        transationType: joi.string().required().valid(['in', 'out']),
        quantity: joi.number().required(),
        transationIdParent: joi.string().length(24).optional()
    });
    return await validateHelper.validateSchema(req.body, schema);
};