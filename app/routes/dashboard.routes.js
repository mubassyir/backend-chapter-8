var router = require('express').Router();
var auth = require('../middleware/auth.middleware.js')

module.exports =(dashboard)=> {
  const dashboardController = require("../controllers/dashboard.controller");
    router.get("/",dashboardController.get);
    router.get("/login",dashboardController.login);
    router.get("/register",dashboardController.register);

    //Login
    router.post("/createToken",dashboardController.attempLogin);

    //Create
    router.post("/create_user",dashboardController.createUser);
    router.post("/create_bio",dashboardController.createBio);
    router.post("/create_history",dashboardController.createHistory);

    //Form
    router.get("/form_user/:id",dashboardController.getForm);
    router.get("/form_biodata/:id",dashboardController.getFormBio);
    router.get("/form_history/:id",dashboardController.getFormHistory);
    
    //Update
    router.post("/user_update/:id",dashboardController.updateUser);
    router.post("/biodata_update/:id",dashboardController.updateBio);
    router.post("/history_update/:id",dashboardController.updateHistory);

    //Delete
    router.post("/user_delete/:id",dashboardController.deleteUser);
    router.post("/bio_delete/:id",dashboardController.deleteBio);
    router.post("/history_delete/:id",dashboardController.deleteHistory);

    dashboard.use('/',router);
  };
