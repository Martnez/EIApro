const express = require("express");

const controllers = require("../controllers/vehicle");

const router = express.Router();

router.get('/vehicles',controllers.getVehicles);

// router.get('/new-client',controllers.getNewClient);

router.get('/new-vehicle',controllers.getNewVehicle);

router.post('/new-vehicle',controllers.postNewVehicle);

module.exports= router;