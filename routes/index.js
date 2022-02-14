var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',(req,res,next) => {
  //Si está autenticado salta de midleware,-> isAuthenticated viene de passport
  if(req.isAuthenticated()){
      return next()
  }
  //Sino renvia el formulario
  return res.redirect("/login")
},

(req,res,next) => {
  res.render("index")
});

module.exports = router;
