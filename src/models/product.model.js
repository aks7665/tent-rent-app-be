const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            default: 0
        },
        quantity: { // quanity in the inventory
            type: Number,
            default: 0
        },
        booked: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model(
    "product",
    productSchema
);

module.exports = Product;
