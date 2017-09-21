const express = require("express");
const bodyParser = require("body-parser");
const cors =  require("cors");
const session = require("express-session");
const {secret} = require("./config.js")

const port = 3780;

const app = express(); //initializes express

app.use(bodyParser.json());
app.use(cors()); 
//allows cross-origin requests from any domain, across all endpoints--accomplishes the same thing as custom addHeaders middleware
//primary drawback is insecurity; any domain can freely make requests to server--we will be configuring CORS to whitelist only a specific origin by creating new objects in server.js

var corsOptions = {
	origin: "http://localhose:${port}"
};


app.use(express.static(__dirname + "/public"));
console.log(__dirname);
app.use(cors(corsOptions)); //will only be accepting requests from selected origin 
//CORS doesn't have to be used globally, can be passed to individual routes as middleware
app.use(session({ 
	secret,
	saveUninitialized: true,
    resave: true
}));

//CONTROLLERS
const profileCtrl = require("./controllers/profileCtrl");
const userCtrl = require("./controllers/userCtrl");

//ENDPOINTS
app.post("/api/login", userCtrl.login);
app.get("/api/profiles", profileCtrl.getFriendsProfiles);

app.listen(port, function() {
	console.log(`Listening on ${port}`);
});