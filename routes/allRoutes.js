const express = require("express");

const homeControllers = require("../controllers/home");

const clientsControllers = require("../controllers/clients");

const underwritingControllers = require("../controllers/underwriting");

const vehicleControllers = require("../controllers/vehicle");

const claimsControllers = require("../controllers/claims");

const editControllers = require("../controllers/edits")

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

router.get('/vehicle-view/:vehicleId',vehicleControllers.getVehicleView);

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
//claims routes
router.get('/claims',claimsControllers.getClaims);

router.get('/new-claim',claimsControllers.getNewClaim);

router.post('/new-claim',claimsControllers.postNewClaim);

router.get('/claim-view/:claimId',claimsControllers.getClaimView);
// all edits
router.get('/edit/:vehicleId',editControllers.getVehicleEdit);

router.post('/edit/:vehicleId',editControllers.postVehicleEdit);

router.get('/client-edit/:clientId',editControllers.getClientEdit);

router.post('/client-edit/:clientId',editControllers.postClientEdit);

router.get('/nonMotor-edit/:policyId',editControllers.getNonMotorEdit);

router.post('/nonMotor-edit/:policyId',editControllers.postNonMotorEdit);

router.get('/motor-edit/:policyId',editControllers.getMotorEdit);

router.post('/motor-edit/:policyId',editControllers.postMotorEdit);




module.exports =router;