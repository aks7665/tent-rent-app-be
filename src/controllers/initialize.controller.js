const initData = require("../utils/constants/init-data.constant");
const {
    STATUS_CODE,
    APP_MESSAGES
} = require("../utils/constants/index.constant");
const universalFunction = require('../utils/helpers/universal-function');
const Model = require("../models/index.model");
const customerController = require('./customer.controller');
const productController = require('./product.controller');
const transactionController = require('./transaction.controller');

exports.initializeData = async (req, res, next) => {
    try {
        const dataToSend = {};
        // Clear all records
        await customerController.deleteAll();
        await productController.deleteAll();
        await transactionController.deleteAll();

        // // Store sample data
        dataToSend.customers  = await customerController.createMany(initData.initUsers);
        dataToSend.products = await productController.createMany(initData.initProducts);
        
        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.INITIALIZE_SUCCESS,
            dataToSend
        );
    } catch (error) {
        next(error);
    }
};