const express = require("express");

const homeControllers = require("../controllers/home");

const clientsControllers = require("../controllers/clients");

const underwritingControllers = require("../controllers/underwriting");

const vehicleControllers = require("../controllers/vehicle");

const router = express.Router();
// client routes
router.get('/clients',clientsControllers.getClients);

router.get('/new-client',clientsControllers.getNewClient);

router.get('/client-profile/:clientId',clientsControllers.getClientProfile);

router.post('/new-client',clientsControllers.postClient);

// underwriting routes
router.get('/underwriting',underwritingControllers.getUnderwriting)

router.get('/new-motor',underwritingControllers.getNewMotor);

router.post('/new-motor',underwritingControllers.postNewMotor);

router.get('/new-non-motor',underwritingControllers.getNewNonMotor);

router.post('/new-non-motor',underwritingControllers.postNonMotor);

router.get('/policyView/:policyId',underwritingControllers.getPolicyView);

// vehicles routes
router.get('/new-vehicle',vehicleControllers.getNewVehicle);

router.get('/vehicles',vehicleControllers.getVehicles);

router.post('/new-vehicle',vehicleControllers.postNewVehicle);

// home routes
router. get('/home',homeControllers.getIndex);

router. get('/',homeControllers.getIndex);

router. get('/dashboard',homeControllers.getDashboard);

router.post('/',homeControllers.postIndex);

router. get('/new-user',homeControllers.getNewUser);

router. post('/new-user',homeControllers.postNewUser);

router. get('/admin',homeControllers.getAdmin);

router.get('/logout',homeControllers.postLogout);

router. get('/logs',homeControllers.getLogs);

router.get('/user-profile/:userId',homeControllers.getUserProfile);

router.get('/delete-user/:userId',homeControllers.postDeleteUser);

router.get('/reset-flag/:userId',homeControllers.postResetFlag);
module.exports =router;