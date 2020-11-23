const db = require("../models");
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
const User = db.user;
const Op = require('sequelize').Op;
const passport = require("passport");
// const jwt = require("jsonwebtoken");
require("../config/passport")(passport);

getToken= (headers)=> {
  if (headers && headers.authorization){
    let parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

//SignUp
exports.createUser = async(req, res) => {
    try{
      let{email,password} = await req.body;
      await User.findOne({where:{email:email}}).then((result)=>{
        if(result){
           return res.status(500).send({message:"data already exsit"});
         } else{
          User.create({email:email, password:password }) 
          .then(() => {
            res.send({message:"creating data success"});
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || "some error while creating User data",
            });
          });
         }
      })
     
    }catch(err){
      res.json({message : err.message})
    }
};

exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email? {email: {[Op.iLike]: `%${email}%`,},}: null;

  // res.send({message:condition})
  User.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "there is no tutorial with that email",
      });
    });
};

// query with query params id
exports.findOne = (req, res) => {
  const id = req.params.user_id;
  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `there is no tutorial with that ${id}` ,
      });
  });
};

// update user
exports.update = (req, res) => {
  let id = req.params.user_id;
  let {email,password} = req.body;
  let hash = bcrypt.hashSync(password, salt);

  User.update({email:email,password:hash}, {
    where: { id: id }}).then((num) => {
      if (num == 1) {
        res.send({message: "updating user success"})
      } else {
        res.send({
          message: `Cannot update user with id=${id} `,
        });
      }}).catch((err) => {
      res.status(500).send({
        message: err.message || `Errot updating user with ${id}`,
      });
  });
};

exports.delete = (req, res) => {
  const user_id = req.params.user_id;
  User.destroy({ where: { id: user_id } }).then((num) => {
    if (num == 1) {
      res.send({message:`succesfully delete data with id=${user_id}`});
    } else {
      res.send({
        message: `Cannot delete user with id=${user_id}`,
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message: err.message || `Could not delete user with ${user_id}`,
    });
  });
  
};

// delele all
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  }).then(() => {
      res.send({
        message: 'User was deleted successfully',
      });
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Deleted  all Failed",
      });
  });
};
