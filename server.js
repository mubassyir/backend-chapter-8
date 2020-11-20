const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument= require("./swagger.json");
const db = require("./app/models");
const app = express();
const PORT = process.env.PORT ||8080;
require('dotenv').config();

let corsOption = {
    origin : 'http://localhost:8080 ',
    origin : 'http://localhost:3000 '   
}

//Ejs Setting
app.set('view engine', 'ejs');

// cors and body parser
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use( (request, response, next) => {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//Syc
db.sequelize.sync().then(()=>{
    console.log("Creating tables success . . . ")
}).catch((err)=>{
    console.log(err.message||"something wrong with credential data")
})

//call from routes
require("./app/routes/user.routes.js")(app); //Routes for user API
require("./app/routes/bio.routes.js")(app); //Routes for biodata API
require("./app/routes/history_routes.js")(app); //Routes for history API

app.use("/user-doc",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.listen(PORT,()=>{
    console.log(`server http://localhost/${PORT}/api/ running . . . `);
})