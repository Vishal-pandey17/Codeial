// A group of action function in one file is called controller
module.exports.home = function(req, res){
    
    return res.render('home', {
        title: "Home"
    });
}

// module.exports.actionName = function(req, res){}

