const db = require("../models");
const Bio = db.bio;
const Op = db.Sequelize.Op;

// create
exports.create = (req, res) => {
  // validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "content can not be empty",
    });
    return;
  }
  let bio = {
    user_id : req.body.user_id,
    first_name : req.body.first_name,
    last_name : req.body.last_name
  };

  Bio.create(bio) .then(() => {
      res.send({message: "creating User success"});
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error while creating User data",
      });
    });
};

//retrive all data
exports.findAll = (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name? {first_name: {[Op.iLike]: `%${first_name}%`,},}: null;

  Bio.findAll({
    where: condition,
  })
    .then((data) => {
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
  let id = req.params.id;
  Bio.findAll({where:
    {user_id:id}
  }).then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || `there is no biodata with that ${id}` ,
      });
    });
};

//update data
exports.update = (req, res) => {
  let id = req.params.id;
  Bio.update(req.body, {
    where: { bio_id: id },
  }).then((num) => {
      if (num == 1) {
        res.send({
          message: "Bio data updated success",
        });
      } else {
        res.send({
          message: `Cannot update Bio with id=${id} `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Bio with ${id}`,
      });
    });
};

// delete with query params
exports.delete = (req, res) => {
  let id = req.params.id;

  Bio.destroy({ where: { bio_id: id } }).then((num) => {
      if (num == 1) {
        res.send({message: "Deleting user succes"});
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete bio with ${id}`,
      });
    });
};

//Delete all
exports.deleteAll = (req, res) => {
  Bio.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: 'Table bio was deleted successfully',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Deleted  all Failed",
      });
    });
};