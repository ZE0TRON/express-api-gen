const express = require("express");

// For every route
const accountRoutes = require("./account");

const router = express.Router();

// For every route
router.use("/account", accountRoutes);

module.exports = router;
