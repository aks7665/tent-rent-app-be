const {
    Transaction
} = require("../models/index.model");
const {
    isTransactionValidate
} = require("../utils/validations/index.validation");
const {
    STATUS_CODE,
    APP_MESSAGES
} = require("../utils/constants/index.constant");
const universalFunction = require('../utils/helpers/universal-function');
const Model = require("../models/index.model");
const productController = require('./product.controller');

exports.deleteAll = async () => {
    try {
        return await Model.Transaction.deleteMany({});
    } catch (error) {
        throw error;
    }
};

exports.create = async (req, res, next) => {
    try {
        const dataToSend = {};
        await isTransactionValidate.validateCreate(req);
        const body = req.body;

        const type = req.body.transationType;

        const product = await productController.getProduct({ _id: req.body.productId });
        if (!product) {
            throw new Error(APP_MESSAGES.TRANSACTION_PRODUCT_NOT_FOUND);
        }

        const stockQuantity = product.quantity;
        const orderQuantity = req.body.quantity;
        if (stockQuantity < orderQuantity) {
            throw new Error(APP_MESSAGES.TRANSACTION_QUANTITY_EXCEED);
        }

        let parentTransaction;
        if (type === 'out') {
            product.quantity = stockQuantity - orderQuantity;
            product.booked = product.booked + orderQuantity;
        } else {
            parentTransaction = await Model.Transaction.findOne({ _id: req.body.transationIdParent });
            if (!parentTransaction) {
                throw new Error(APP_MESSAGES.TRANSACTION_NOT_FOUND);
            }
            product.quantity = stockQuantity - orderQuantity;
            product.booked = product.booked + orderQuantity;
        }

        const transaction = new Model.Transaction(body);
        await transaction.save();

        if (parentTransaction) {
            parentTransaction.transationIdParent = transaction._id;
            await parentTransaction.save();
            await Model.Transaction.populate(parentTransaction, [
                {
                    path: 'productData',
                    select: { _id: 1, title: 1 }
                },
                {
                    path: 'customerData',
                    select: { _id: 1, name: 1 }
                },
                {
                    path: 'transactionParentData',
                    select: { _id: 1, transationId: 1 }
                }
            ]);
            dataToSend.parentTransaction = parentTransaction;
        }
        
        await product.save();
        dataToSend.product = product;
        await Model.Transaction.populate(transaction, [
            {
                path: 'productData',
                select: { _id: 1, title: 1 }
            },
            {
                path: 'customerData',
                select: { _id: 1, name: 1 }
            },
            {
                path: 'transactionParentData',
                select: { _id: 1, transationId: 1 }
            }
        ]);
        dataToSend.transaction = transaction;

        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.TRANSACTION_CREATE_SUCCESS,
            dataToSend
        );
    } catch (error) {
        next(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const transactions = await Model.Transaction.find({}).populate([
            {
                path: 'productData',
                select: { _id: 1, title: 1 }
            },
            {
                path: 'customerData',
                select: { _id: 1, name: 1 }
            },
            {
                path: 'transactionParentData',
                select: { _id: 1, transationId: 1 }
            }
        ]);

        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.SUCCESS,
            transactions
        );
    } catch (error) {
        next(error);
    }
};