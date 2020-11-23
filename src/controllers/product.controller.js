const Model = require("../models/index.model");
const {
    STATUS_CODE,
    APP_MESSAGES
} = require("../utils/constants/index.constant");
const universalFunction = require('../utils/helpers/universal-function');
const {
    isProductValidate
} = require("../utils/validations/index.validation");

exports.create = async (req, res, next) => {
    try {
        await isProductValidate.validateCreate(req);
        const body = req.body;
        const product = new Model.Product(body);
        await product.save();

        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.PRODUCT_CREATE_SUCCESS,
            product
        );
    } catch (error) {
        next(error);
    }
};

exports.deleteAll = async () => {
    try {
        return await Model.Product.deleteMany({});
    } catch (error) {
        throw error;
    }
};

exports.getProduct = async (query) => {
    try {
        return await Model.Product.findOne(query);
    } catch (error) {
        throw error;
    }
};

exports.createMany = async (records) => {
    try {
        const products = await Model.Product.insertMany(records);
        return products;
    } catch (error) {
        throw error;
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const products = await Model.Product.find({});

        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.SUCCESS,
            products
        );
    } catch (error) {
        console.log(error)
        next(error);
    }
};