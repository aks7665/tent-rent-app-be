const express = require('express');
const { authController, initController, customerController, productController, transactionController, reportController,  } = require('../controllers/index.controller');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

// Auth Routes
router.post('/auth/login', authController.login);

// Initialize Routes
router.get('/initialize', authMiddleware, initController.initializeData);

// Customer Routes
router.get('/customer', authMiddleware, customerController.getAll);
router.post('/customer', authMiddleware, customerController.create);

// Product Routes
router.get('/product', authMiddleware, productController.getAll);
router.post('/product', authMiddleware, productController.create);

// Transaction Routes
router.get('/transaction', authMiddleware, transactionController.getAll);
router.post('/transaction', authMiddleware, transactionController.create);

// Report Routes
router.get('/report', reportController.getReports);

module.exports = router;
