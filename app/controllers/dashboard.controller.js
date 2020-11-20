const db = require("../models");

// create
exports.createUser = (req, res) => {
  // validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "content can not be empty",
    });
    return;
  }

  // Create User
  const user = {
    email : req.body.email,
    password : req.body.password
  };
  db.user.create(user) .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error while creating User data",
      });
    });
};

exports.createBio = (req, res) => {
  // validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "content can not be empty",
    });
    return;
  }
  // Create User
  const bio = {
    user_id : req.body.user_id,
    first_name : req.body.first_name,
    last_name : req.body.last_name
  };

  db.bio.create(bio) .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error while creating User data",
      });
    });
};

exports.createHistory = (req, res) => {
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
  db.history.create(history).then(() => {
      res.redirect("/");
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "some error while creating history data",
      });
    });
};

//retrive all data
exports.get = async (req, res) => {
  let user = await db.user.findAll();
  let bio = await db.bio.findAll();
  let history = await db.history.findAll()
  res.render("page/index.ejs",{user,bio,history});
};
exports.login = async (req, res) => {
  res.render("login/login.ejs");
};
exports.register = async (req, res) => {
  res.render("login/register.ejs");
};

exports.getForm = (req, res) => {
  let user_id =req.params.id;
  res.render("page/update.form.ejs",{user_id:user_id})      
};

exports.attempLogin = (req, res) => {
  let{email,password} =req.body;
  if(email||password){
    return
  } else{
    res.json({message:email})
  }
};

exports.getFormBio = (req, res) => {
  let bio_id =req.params.id;
  res.render("page/biodata.form.ejs",{bio_id:bio_id})      
};

exports.getFormHistory = (req, res) => {
  let history_id =req.params.id;
  res.render("page/history.form.ejs",{history_id:history_id})      
};

exports.updateUser = (req, res) => {
  const id = req.params.id;      
  db.user.update(req.body, {
    where: { user_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.redirect("/")
      } else {
        res.send({
          message: `Cannot update user with id=${id} `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating user with ${id}`,
      });
    });
};
exports.updateBio = (req, res) => {
  const id = req.params.id;
  db.bio.update(req.body, {
    where: { bio_id: id },
  }).then((num) => {
      if (num == 1) {
        res.redirect("/")
      } else {
        res.send({
          message: `Cannot update bio with id=${id} `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Errot updating user with ${id}`,
      });
    });
};

exports.updateHistory = (req, res) => {
  const id = req.params.id;
  db.history.update(req.body, {
    where: { history_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.redirect("/")
      } else {
        res.send({
          message: `Cannot update bio with id=${id} `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Errot updating user with ${id}`,
      });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.user.destroy({ where: { user_id: id } })
    .then((num) => {
      if (num == 1) {
        res.redirect("/");
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete user with ${id}`,
      });
    });
};

exports.deleteBio = (req, res) => {
  const id = req.params.id;

  db.bio.destroy({ where: { bio_id: id } })
    .then((num) => {
      if (num == 1) {
        res.redirect("/");
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

exports.deleteHistory = (req, res) => {
  const id = req.params.id;
  db.history.destroy({ 
    where: { history_id: id } })
    .then((num) => {
      if (num == 1) {
        res.redirect("/");
      } else {
        res.send({
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






