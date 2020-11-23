const Model = require("../models/index.model");
const universalFunction = require('../utils/helpers/universal-function');
const {
    STATUS_CODE,
    APP_MESSAGES
} = require("../utils/constants/index.constant");

exports.getReports = async (req, res, next) => {
    try {
        const result = await Model.Product.aggregate([{
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "productId",
                as: "transactions"
            }
        }]);
        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.SUCCESS,
            result
        );
    } catch (error) {
        next(error);
    }
};