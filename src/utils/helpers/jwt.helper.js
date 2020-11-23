var jwt = require("jsonwebtoken");

exports.jwtSign = async (payload) => {
    try {
        return jwt.sign({
                _id: payload._id
            },
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXP
            }
        );
    } catch (error) {
        throw error;
    }
};

exports.jwtVerify = async (token) => {
    try {
        return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw error;
    }
};

exports.jwtDecode = async (token) => {
    try {
        return jwt.decode(token, {
            complete: true,
        });
    } catch (error) {
        throw error;
    }
};