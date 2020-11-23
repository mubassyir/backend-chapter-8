const router = require("express").Router();
const passport = require('passport');
require('../config/passport')(passport);

// ,passport.authenticate('jwt', { session: false})
module.exports = (user) => {
    const userController = require("../controllers/user.controller.js");
    
    router.post("/",userController.createUser);
    router.get("/",userController.findAll);
    // router.get("/",userController.findAll);
    // router.get("/:user_id",userController.findOne);
    router.put("/:user_id",userController.update);
    router.delete("/:user_id",userController.delete);
    router.delete("/",userController.deleteAll);
    
    //path
    user.use("/api/user", router);
  };
