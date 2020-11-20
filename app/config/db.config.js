//information data credential

module.exports = {
    HOST: "localhost",
    USER: process.env.USER || "mubassyir",
    PASSWORD: process.env.PASSWORD || "123",
    DB: process.env.DB ||"gamedb", 
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  