const express = require("express");

const controllers = require("../controllers/home");

const router = express.Router();

router. get('/home',controllers.getIndex);

router. get('/',controllers.getIndex);

router. get('/dashboard',controllers.getDashboard);

router.post('/',controllers.postIndex);

router. get('/new-user',controllers.getNewUser);

router. post('/new-user',controllers.postNewUser);

router. get('/admin',controllers.getAdmin);

router.get('/logout',controllers.postLogout);

router. get('/logs',controllers.getLogs);

router.get('/user-profile/:userId',controllers.getUserProfile);

router.get('/delete-user/:userId',controllers.postDeleteUser);

router.get('/reset-flag/:userId',controllers.postResetFlag);
module.exports =router;