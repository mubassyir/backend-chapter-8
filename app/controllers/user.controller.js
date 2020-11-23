const db = require("../models");
const User = db.user;
const passport = require("passport");
require("../config/passport")(passport);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

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
exports.signUp = async(req, res) => {
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

//SignIn
exports.signIn = async(req,res)=>{
  let{email,password} = await req.body;
  User.findOne({where: {email: email}}).then((user) => {
      if (!user) {
        return res.status(401).send({
          message: "Username not found",
        });
      };
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign(JSON.parse(JSON.stringify(user)),"nodeauthsec",{expiresIn: 86400 * 30 });
          jwt.verify(token, "nodeauthsec", function (err, user) {console.log(err, user)});
          res.json({success: true,token: "JWT " + token,});
        } else {
          res.status(401).send({
            success: false,
            message: "Authentication failed. Wrong password" 
          });
        }
      });
    
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message || "something error when login",
      });
    });
}
exports.findAll = (req, res) => {
  let token = getToken(req.headers);
  let email = req.query.email;
  let condition = email? {email: {[Op.iLike]: `%${email}%`,},}: null;
  if(token){
    User.findAll({
      where: condition,
    }).then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "there is no tutorial with that email",
        });
      });
  }
};

// query with query params id
exports.findOne = (req, res) => {
  let token = getToken(req.headers);
  const id = req.params.user_id;
  if(token){
    User.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `there is no tutorial with that ${id}` ,
        });
      });
  }
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
  
  User.destroy({ where: { id: user_id } })
  .then((num) => {
    if (num == 1) {
      res.send({message:`succesfully delete data with id=${user_id}`});
    } else {
      res.status(500).send({
        message: `Cannot delete user with id=${user_id}`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || `Could not delete user with ${user_id}`,
    });
  });
  
};

// delele all
exports.deleteAll = (req, res) => {
  let token= getToken(req.headers);
  if(token){
    User.destroy({
      where: {},
      truncate: false,
    })
      .then(() => {
        res.send({
          message: 'User was deleted successfully',
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Deleted  all Failed",
        });
      });
  }
};
