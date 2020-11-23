const bcrypt = require("bcryptjs");

/**
 *
 * @param {String} plainTextPassword Unsecured Password
 * @return {String} Secured Password
 */
exports.hashPasswordUsingBcrypt = async (plainTextPassword) => {
    const saltRounds = 10;
    return await bcrypt.hashSync(plainTextPassword, saltRounds);
};


/**
 * 
 * @param {String} plainTextPassword Password to be checked
 * @param {String} passwordhash Hashed Password
 */
exports.comparePasswordUsingBcrypt = async (plainTextPassword, passwordhash) => {
    return await bcrypt.compareSync(plainTextPassword, passwordhash);
};