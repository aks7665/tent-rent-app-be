const {
    isAuthValidate
} = require("../utils/validations/index.validation");
const userController = require("./user.controller");
const {
    STATUS_CODE,
    APP_MESSAGES
} = require("../utils/constants/index.constant");
const universalFunction = require('../utils/helpers/universal-function');
const bcryptHelper = require("../utils/helpers/bcrypt.helper");
const jwtHelper = require("../utils/helpers/jwt.helper");


const login = async (req, res, next) => {
    try {
        await isAuthValidate.validateLogin(req);
        const email = req.body.email;
        const password = req.body.password;

        const query = {
            email
        }

        let user = await userController.getOne(query);
        if (!user) {
            throw new Error(APP_MESSAGES.LOGIN_ERROR);
        }

        const isPasswordMatch = await bcryptHelper.comparePasswordUsingBcrypt(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            throw new Error(APP_MESSAGES.LOGIN_ERROR);
        }

        // Removing password from user info
        user = await user.toClean();

        const token = await jwtHelper.jwtSign(user);
        user.token = token;

        return universalFunction.sendResponse(
            req,
            res,
            STATUS_CODE.SUCCESS,
            APP_MESSAGES.LOGIN_SUCCESS,
            user
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};