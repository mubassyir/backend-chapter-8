const router = require('express').Router();
const passport = require('passport');
require('../config/passport')(passport);

module.exports = (bio) => {
    const bioController = require("../controllers/bio.controller.js");
    
    router.post("/",passport.authenticate('jwt', { session: false}),bioController.create);
    router.get("/",passport.authenticate('jwt', { session: false}),bioController.findAll)
    router.get("/:id",passport.authenticate('jwt', { session: false}), bioController.findOne);
    router.put("/:id",passport.authenticate('jwt', { session: false}), bioController.update);
    router.delete("/:id",passport.authenticate('jwt', { session: false}), bioController.delete);
    router.delete("/",passport.authenticate('jwt', { session: false}), bioController.deleteAll);
    
    //path
    bio.use("/api/biodata", router);
  };
