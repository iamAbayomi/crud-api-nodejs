const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//import proxy from 'http-proxy-middleware'
//app.use('/api/**', proxy({ target: "http://localhost:8080" }));

const app = express();

var corsOptions = {
    origin: "http://localhost:27017"
};

app.options('*', cors())


app.use(cors());

app.options('*', cors())


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// app.all('/*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });
  
// CORS header `Access-Control-Allow-Origin` set to accept all
app.get('/', function(request, response) {
  //response.set('Access-Control-Allow-Origin', '*');
 // response.sendFile(__dirname + '/message.json');
});

//simple route
app.get("/",(req,res)=>{
    res.json({ message: "Welcome to this application. "});
});

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>{
        console.log("Connected to the database!");
    })
    .catch(err=> {
        console.log("Cannot connect to the database!" , err);
        process.exit();
    });


require("./app/routes/tutorial.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen( PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})
