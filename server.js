// Get required modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');


// Specify configurations
var { url } = require('./config/db');
var models = require('./app/models/models.js');
var jobDao = require('./app/dao/jobDao.js');
var userDao = require('./app/dao/userDao.js');
var PORT = 8080; // set our port

// connect to our mongoDB database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo ')
})

mongoose.connection.on('error', (err) => {
    console.log('connected to mongo ', err)
})


// Get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(session({ secret: 'mananpandeyjobs', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(morgan('dev')); // log every request to the console
app.use(flash());


// Configure routes
require('./config/passport')(passport);
require('./app/routes')(app, passport); // pass our application into our routes


// Start our app !!
app.listen(PORT, () => {
    console.log('server is running on', PORT)
})
exports = module.exports = app; // expose app

// var defaultUser = new models.User({
//     firstName: "Manan",
//     lastName: "Pandey",
//     username: "manan",
//     password: "password",
//     email: "email@email.com"
// });

// userDao.findByUsername("manan", function(result) {
//     if (result == null) {
//         defaultUser.password = defaultUser.generateHash(defaultUser.password);
//         userDao.saveUser(defaultUser, function(dummy) {});
//     } else {
//         defaultUser = result;
//         console.log(result);
//     }
// });

//console.log(defaultUser);