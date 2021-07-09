const express = require("express");

const homeControllers = require("../controllers/home");

const clientsControllers = require("../controllers/clients");

const underwritingControllers = require("../controllers/underwriting");

const vehicleControllers = require("../controllers/vehicle");

const claimsControllers = require("../controllers/claims");

const editControllers = require("../controllers/edits")
const creditControllers = require("../controllers/credit")
const isAuth = require('../middleware/auth');

const router = express.Router();
// client routes
router.get('/clients',isAuth,clientsControllers.getClients);

router.get('/new-client',isAuth,clientsControllers.getNewClient);

router.get('/client-profile/:clientId',isAuth,clientsControllers.getClientProfile);

router.post('/new-client',clientsControllers.postClient);

// underwriting routes
router.get('/underwriting',isAuth,underwritingControllers.getUnderwriting)

router.get('/new-motor',isAuth,underwritingControllers.getNewMotor);

router.post('/new-motor',underwritingControllers.postNewMotor);

router.get('/new-non-motor',isAuth,underwritingControllers.getNewNonMotor);

router.post('/new-non-motor',underwritingControllers.postNonMotor);

router.get('/policyView/:policyId',isAuth,underwritingControllers.getPolicyView);

// vehicles routes
router.get('/new-vehicle',isAuth,vehicleControllers.getNewVehicle);

router.get('/vehicles',isAuth,vehicleControllers.getVehicles);

router.get('/vehicle-view/:vehicleId',isAuth,vehicleControllers.getVehicleView);

router.post('/new-vehicle',vehicleControllers.postNewVehicle);

// home routes
router. get('/home',homeControllers.getIndex);

router. get('/',homeControllers.getIndex);

router. get('/dashboard',isAuth,homeControllers.getDashboard);

router.post('/',homeControllers.postIndex);

router. get('/new-user',isAuth,homeControllers.getNewUser);

router. post('/new-user',homeControllers.postNewUser);

router. get('/admin',isAuth,homeControllers.getAdmin);

router.get('/logout',isAuth,homeControllers.postLogout);

router. get('/logs',isAuth,homeControllers.getLogs);

router.get('/user-profile/:userId',isAuth,homeControllers.getUserProfile);

router.get('/delete-user/:userId',isAuth,homeControllers.postDeleteUser);

router.get('/reset-flag/:userId',isAuth,homeControllers.postResetFlag);
//claims routes
router.get('/claims',isAuth,claimsControllers.getClaims);

router.get('/new-claim',isAuth,claimsControllers.getNewClaim);

router.get('/new-claim/:policyType',isAuth,claimsControllers.getNewClaim);

router.post('/new-claim',claimsControllers.postNewClaim);

router.get('/claim-view/:claimId',isAuth,claimsControllers.getClaimView);
// all edits
router.get('/edit/:vehicleId',isAuth,editControllers.getVehicleEdit);

router.post('/edit/:vehicleId',editControllers.postVehicleEdit);

router.get('/client-edit/:clientId',isAuth,editControllers.getClientEdit);

router.post('/client-edit/:clientId',editControllers.postClientEdit);

router.get('/nonMotor-edit/:policyId',isAuth,editControllers.getNonMotorEdit);

router.post('/nonMotor-edit/:policyId',editControllers.postNonMotorEdit);

router.get('/motor-edit/:policyId',isAuth,editControllers.getMotorEdit);

router.post('/motor-edit/:policyId',editControllers.postMotorEdit);
// delete items
router.get('/delete-client/:clientId',isAuth,clientsControllers.getdeleteClient);

router.get('/delete-policy/:clientId',isAuth,underwritingControllers.getdeletePolicy)
// credit
router.post('/credit/:policyId',isAuth,creditControllers.postCredit);
router.get('/credit/:policyId',isAuth,creditControllers.getCredit);
router.get('/insurancePay/:policyId',isAuth,creditControllers.getInsurancePay);




module.exports =router;