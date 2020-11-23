// Mongo DB Connection

const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { APP_MESSAGES } = require('../utils/constants/index.constant');
const { AdminSeeder } = require('./seeders/index.seeder');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(APP_MESSAGES.DATABASE_CONN_SUCCESS);
    /** execute seeders */
    AdminSeeder.seedAdmin();
}).catch((e) => {
    console.log(APP_MESSAGES.DATABASE_CONN_ERROR);
});

autoIncrement.initialize(mongoose.connection);