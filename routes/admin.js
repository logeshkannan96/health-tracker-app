/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin");

router
  .post("/create", admin.create)

module.exports = router;
