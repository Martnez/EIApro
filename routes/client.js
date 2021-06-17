const express = require("express");

const controllers = require("../controllers/clients");

const router = express.Router();

router.get('/clients',controllers.getClients);

router.get('/new-client',controllers.getNewClient);

router.post('/new-client',controllers.postClient);

module.exports= router;