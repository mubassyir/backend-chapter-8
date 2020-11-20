const router = require("express").Router();
const passport = require('passport');
require('../config/passport')(passport);

// ,passport.authenticate('jwt', { session: false})
module.exports = (user) => {
    const userController = require("../controllers/user.controller.js");
    
    router.post("/signUp",userController.signUp);
    router.post("/signIn",userController.signIn);
    router.get("/",passport.authenticate('jwt', { session: false}),userController.findAll);
    router.get("/:user_id",passport.authenticate('jwt', { session: false}),userController.findOne);
    router.put("/:user_id",passport.authenticate('jwt', { session: false}),userController.update);
    router.delete("/:user_id",passport.authenticate('jwt', { session: false}),userController.delete);
    router.delete("/",passport.authenticate('jwt', { session: false}),userController.deleteAll);
    
    //path
    user.use("/api/user", router);
  };
