const express = require("express");

const homeControllers = require("../controllers/home");

const clientsControllers = require("../controllers/clients");

const underwritingControllers = require("../controllers/underwriting");

const vehicleControllers = require("../controllers/vehicle");

const claimsControllers = require("../controllers/claims");

const editControllers = require("../controllers/edits")
const creditControllers = require("../controllers/credit")
const reportsControllers = require("../controllers/reports")
const isAuth = require('../middleware/auth');
const adminAuth=require('../middleware/admin');
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

router. get('/new-user',isAuth,adminAuth,homeControllers.getNewUser);

router. post('/new-user',homeControllers.postNewUser);

router. get('/admin',isAuth,adminAuth,homeControllers.getAdmin);

router.get('/logout',isAuth,homeControllers.postLogout);

router. get('/logs',isAuth,adminAuth,homeControllers.getLogs);

router.get('/user-profile/:userId',isAuth,adminAuth,homeControllers.getUserProfile);

router.post('/user-profile/:userId',isAuth,homeControllers.getUserProfileEdit);

router.get('/delete-user/:userId',isAuth,adminAuth,homeControllers.postDeleteUser);

router.get('/reset-flag/:userId',isAuth,homeControllers.postResetFlag);
//claims routes
router.get('/claims',isAuth,claimsControllers.getClaims);

router.get('/claim-action/:claimId',isAuth,claimsControllers.getClaimAction);

router.post('/claim-action/:claimId',isAuth,claimsControllers.postClaimAction);

router.get('/deleteAction/:claimActionId/:claimId',isAuth,claimsControllers.deleteAction);

router.get('/new-claim',isAuth,claimsControllers.getNewClaim);

router.get('/new-claim/:policyType',isAuth,claimsControllers.getNewClaim);

router.post('/new-claim',claimsControllers.postNewClaim);

router.get('/claim-view/:claimId',isAuth,claimsControllers.getClaimView);

router.get('/edit-claim/:claimId',isAuth,claimsControllers.getClaimEdit);

router.post('/claim-edit/:claimId',isAuth,claimsControllers.postClaimEdit);

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
router.get('/delete-policy/:clientId',isAuth,underwritingControllers.getdeletePolicy);
router.get('/delete-claim/:claimId',isAuth,claimsControllers.getdeleteClaim);
// credit
router.post('/credit/:policyId',isAuth,creditControllers.postCredit);

router.get('/credit/:policyId',isAuth,creditControllers.getCredit);

router.get('/insurancePay/:policyId',isAuth,creditControllers.getInsurancePay);

router.get('/credit',isAuth,reportsControllers.getReports);

router.get('/paymentlist',isAuth,reportsControllers.getPaymentList);

router.post('/insurancePay/:policyId',isAuth,creditControllers.postInsurancePay);

router.post('/creditPay/:policyId',isAuth,creditControllers.postCreditPay);
router.get('/pay_delete/:payId/:policyId',isAuth,creditControllers.getPayDelete);
router.get('/credit_delete/:creditId/:policyId',isAuth,creditControllers.getCollectDelete);




module.exports =router;