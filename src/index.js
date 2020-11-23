const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require("http");
const { STATUS_CODE, APP_MESSAGES } = require('./utils/constants/index.constant');
const universalFunction = require('./utils/helpers/universal-function');

// Database connection
require('./database/db.connection');

const port = process.env.PORT;

const server = http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, X-custom-header");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, DELETE, PUT");
    next();
});

// Routes
const appRoutes = require('./routes/app.routes');
app.use("/api/app/v1", appRoutes);

// Global error handler middleware
app.use((error, req, res, next) => {
    console.log(error)
    if(error) {
        return universalFunction.sendErrorResponse(req, res, STATUS_CODE.BAD_REQUEST, error);
    }  
    next();
});

// 404 Error
app.get('*', (req, res) => {
    return res.status(400).send({
        status: false,
        statusCode: STATUS_CODE.NOT_FOUND,
        message: APP_MESSAGES.NOT_FOUND
    });
});

server.listen(port, () => {
    console.log('Server is up on port ' + port);
});