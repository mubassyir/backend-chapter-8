const bcrypt = require("bcryptjs");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  User.beforeSave((user, options) => {
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(8),
        null
      );
    }
  });

  User.prototype.comparePassword = function (passw, callbck) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return callbck(err);
      }
      callbck(null, isMatch);
    });
  };
  return User;
};
