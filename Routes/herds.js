const express = require("express");

const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../Models/Users");
const findUserById = require("../Functions/Users/findUserById");
const verifyToken = require("../Functions/Users/verifyJwtToken");

router.get("/takeAllHerds", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.S3_SECRETKEY, async (error, authData) => {
    if (error) {
      res.status(403).json({ Error: "Błąd uwierytelniania!" });
    } else {
      const checkUser = await findUserById(Users, authData);
      if (checkUser !== null) res.status(200);
    }
  });
});

module.exports = router;
