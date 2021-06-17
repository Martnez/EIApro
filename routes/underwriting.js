const express = require("express");

const controllers = require("../controllers/underwriting");

const router = express.Router();

router.get('/underwriting',controllers.getUnderwriting)

router.get('/new-motor',controllers.getNewMotor);

router.get('/new-non-motor',controllers.getNewNonMotor);

module.exports= router;