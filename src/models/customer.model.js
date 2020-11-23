const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Customer = mongoose.model(
    "customer",
    customerSchema
);

module.exports = Customer;
