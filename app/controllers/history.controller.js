const db = require("../models");
const History = db.history;
const Op = db.Sequelize.Op;

// create and  save a new tutorial
exports.create = (req, res) => {
  // validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "content can not be empty",
    });
    return;
  }

  // Create history
  const history = {
    user_id : req.body.user_id,
    result : req.body.result
  };
  History.create(history).then(() => {
      res.send({message: "creating history success"});
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "some error while creating history data",
      });
    });
};

//retrive all data
exports.findAll = (req, res) => {
  History.findAll({
  }).then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "there is no tutorial with that name",
      });
    });
};

// query with query params id
exports.findOne = (req, res) => {
    let id = req.params.user_id;
    History.findAll({user_id:id}).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.status(500).send({
          message: err.message || `there is no history with that ${id}` ,
        });
      });
  };
  
//update data
exports.update = (req, res) => {
    const id = req.params.user_id;  
    History.update(req.body, {
      where: { user_id: id },
    }).then((num) => {
        if (num == 1) {
          res.send({
            message: "history data updated successfully",
          });
        } else {
          res.send({
            message: `Cannot update history with id=${id} `,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Errot updating history with ${id}`
        });
      });
  };

// delete with query params
exports.delete = (req, res) => {
    let id = req.params.user_id;
    History.destroy({ where: { user_id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({message:"delete history success"});
        } else {
          res.status(400).send({
            message: `Cannot delete history with id=${id}`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Could not delete history with ${id}`,
        });
      });
  };

//Delete all
exports.deleteAll = (req, res) => {
    History.destroy({
      where: {},
      truncate: false,
    }).then((nums) => {
        res.send({
          message: 'Table history was deleted successfully',
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Deleted  all Failed",
        });
      });
  };