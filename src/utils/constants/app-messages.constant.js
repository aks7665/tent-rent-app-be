"use strict";

const APP_MESSAGES = {
	SUCCESS: "Successfully.",
	UNAUTHORIZED: "Unauthorized",
	FORBIDDEN: "Forbidden",
	DATABASE_CONN_SUCCESS: "Database successfully connected.",
	DATABASE_CONN_ERROR: "Database connection failed.",
	IMPLEMENTATION_ERROR: "Implementation error.",
	INTERNAL_SERVER_ERROR: "Internal server error.",
	NOT_FOUND: "URL not found.",
	LOGIN_ERROR: "Invalid email/password combination.",
	LOGIN_SUCCESS: "Login successfully.",
	INITIALIZE_SUCCESS: "Initialize successfully.",
	CUSTOMER_CREATE_SUCCESS: "Customer created successfully.",
	PRODUCT_CREATE_SUCCESS: "Product created successfully.",
	TRANSACTION_CREATE_SUCCESS: "Transation recorded successfully.",
	TRANSACTION_PRODUCT_NOT_FOUND: "Product is not available anymore.",
	TRANSACTION_QUANTITY_EXCEED: "Orderd quantity is more than the stock availability.",
	TRANSACTION_ALREADY_RETURNED: "Transaction is already returned.",
	TRANSACTION_NOT_FOUND: "Transaction not found."
};

module.exports = APP_MESSAGES;