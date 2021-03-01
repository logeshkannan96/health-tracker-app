const express = require('express');
const router = express.Router();
const user = require('../controllers/users');

router
    .post("/create/user", user.createUser)
    .put("/create/healthdata/:userId", user.createHealthData)
    .put("/update/:userId", user.update)
    .get("/get/user/:userId", user.getUserDetails)
    .get("/get/user/:userId/healthdata", user.getUserHealthData);

module.exports = router;
