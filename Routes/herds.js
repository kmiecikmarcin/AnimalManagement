const express = require("express");

const router = express.Router();
require("dotenv").config();
// const jwt = require("jsonwebtoken");
const verifyToken = require("../Functions/Users/verifyJwtToken");

router.get("/takeAllHerds", verifyToken, () => {});

module.exports = router;
