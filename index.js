const { pseudoRandomBytes } = require('crypto');
const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/',require('./routes'));


app.listen(port, function(err){

   if(err)
   {
    //  console.log("error", err);

    // Instead of that use interpolation
    console.log(`Error in running server : ${err}`);
   }
   console.log(`Server is running on port: ${port}`);
});