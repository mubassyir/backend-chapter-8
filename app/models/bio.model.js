module.exports = (sequelize, Sequelize) => {
    const Biodata = sequelize.define("user_biodata", {
      bio_id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull :false
      },
      last_name: {
        type: Sequelize.STRING,
      }
    });
  
    return Biodata;
  };
  