const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');


app.use(express.static('./assest'));
app.use(expressLayouts);
// extract the style and script from the sub page into the head tag of the layout..with help of express-ejs-layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){

        // Interpolation
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
