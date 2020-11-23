const Model = require("../models/index.model");
const {
    STATUS_CODE,
    APP_MESSAGES
} = require("../utils/constants/index.constant");
const universalFunction = require('../utils/helpers/universal-function');
const {
    isCustomerValidate
} = require("../utils/validations/index.validation");

exports.create = async (req, res, next) => {
    try {
        await isCustomerValidate.validateCreate(req);
        const body = req.body;
        const customer = new Model.Customer(body);
        await customer.save();

        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.CUSTOMER_CREATE_SUCCESS,
            customer
        );
    } catch (error) {
        next(error);
    }
};

exports.deleteAll = async () => {
    try {
        return await Model.Customer.deleteMany({});
    } catch (error) {
        throw error;
    }
};

exports.createMany = async (records) => {
    try {
        const customers = await Model.Customer.insertMany(records);
        return customers;
    } catch (error) {
        throw error;
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const customers = await Model.Customer.find({});

        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.SUCCESS,
            customers
        );
    } catch (error) {
        next(error);
    }
};