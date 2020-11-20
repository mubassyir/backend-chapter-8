module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("user_history", {
      history_id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
      },
      result: {
        type: Sequelize.STRING,
        allowNull : false
      }
    });
  
    return History;
  };
  