const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const transactionSchema = new mongoose.Schema(
    {
        transationId: {
            type:Number,
            default:1000
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        transationType : {
            type: String,
            trim: true,
            lowercase: true,
            enum: ['in', 'out'],
            default: 'in'
        },
        quantity: {
            type: Number,
            default: 0
        },
        transationIdParent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "transaction"
        }
    },
    {
        timestamps: true
    }
);

// Virtuals
transactionSchema.virtual('customerData', {
    ref: 'customer',
    localField: 'customerId',
    foreignField: '_id',
    justOne: true
});

transactionSchema.virtual('productData', {
    ref: 'product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

transactionSchema.virtual('transactionParentData', {
    ref: 'transaction',
    localField: 'transationIdParent',
    foreignField: '_id',
    justOne: true
});

autoIncrement.initialize(mongoose.connection);
// Auto increment
transactionSchema.plugin(autoIncrement.plugin, {
    model: 'transaction',
    field: 'transationId',
    startAt: 1000,
    incrementBy: 1
});

transactionSchema.set('toObject', { virtuals: true });
transactionSchema.set('toJSON', { virtuals: true });

const Transaction = mongoose.model(
    "transaction",
    transactionSchema
);

module.exports = Transaction;
