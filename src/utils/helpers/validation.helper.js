const joi = require("joi");
const STATUS_CODE = require("../constants/status-code.constant");

exports.validateSchema = async (inputs, schema) => {
    try {
        const {
            error,
            value
        } = joi.validate(inputs, schema);
        if (error) throw error.details ? error.details[0].message : "";
        else return false;
    } catch (error) {
        throw error;
    }
};

exports.validationError = async (res, error) => {
    const code = STATUS_CODE.UNPROCESSABLE_ENTITY;
    return res.status(code).send({
        statusCode: code,
        error: error.details ? error.details[0].message : "",
        message: error.details ? error.details[0].message : "",
    });
};