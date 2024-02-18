const express = require("express");
const router = express.Router();
const { GetNumericData, GetRandomNumeric } = require("../controller/numericDataController");

/**
 * Declare route for router
 */
router.route("/getall").get(GetNumericData);
router.route("/getrandom").get(GetRandomNumeric);

module.exports = router;