const { User } = require("../models/index.model");

exports.getOne = async (query) => {
    try {
        return await User.findOne(query);
    } catch (error) {
        throw error;
    }
};