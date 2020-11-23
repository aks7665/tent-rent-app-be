const mongoose = require("mongoose");
const bcryptHelper = require("../utils/helpers/bcrypt.helper");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'admin',
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Index
userSchema.index({ email: 1 });

// To hash password before saving a user into database
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptHelper.hashPasswordUsingBcrypt(user.password);
    }
    next();
});

// To remove password and tokens from user data before sending reaponse to client
userSchema.methods.toClean = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
};

const User = mongoose.model(
    "user",
    userSchema
);

module.exports = User;
