var router = require('express').Router();

module.exports = (history) => {
    const historyController = require("../controllers/history.controller.js");
    
    router.post("/",historyController.create);
    router.get("/",historyController.findAll);
    router.get("/:user_id", historyController.findOne);
    router.put("/:user_id", historyController.update);
    router.delete("/:user_id", historyController.delete);
    router.delete("/", historyController.deleteAll);
    
    //path
    history.use("/api/history", router);
  };
