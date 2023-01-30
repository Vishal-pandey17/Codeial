const express = require('express');

const cookieParser = require('cookie-parser');  // use in manual aurthendication toread and write in set cookie
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie.
const session = require('express-session');          
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session); // use to store our session cookie in mongodb.
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// setup the chatserver to be used with socket.io
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assest'));
// app.use(express.static(env.asset_path));
// make the uploads part avaliable to the browser 
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);
// extract the style and script from the sub page into the head tag of the layout..with help of express-ejs-layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store the session cookie in the db
//Middleware is used to encrypt our session cookie
console.log('Hello session')
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,       /* when the user has not loggedIn in that case do i want to store
                                     extra data in session cookie? No i don't so it is false*/
    resave: false,                  /* when the identity is establish in session cookie so i not save 
                                       again and again so i do false*/
    cookie: {
        maxAge: (1000*60*100)   // milliseconds
    },
    store: new MongoStore(                    // use to store the cookie in DB
        {
            mongooseConnection: db,
            autoRemove: 'disable'
        },
        function(err)
        {
            console.log(err || 'connect mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){

        // Interpolation
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
