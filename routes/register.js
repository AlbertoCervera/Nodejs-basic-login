var express = require('express');
var router = express.Router();
const Users = require("../models/users")



router.get('/register', function(req, res, next) {


  res.render('./auth/register', { 
    title: 'Register',
    btn: "Registrarse",
    registro: true ,
    action: "/register"
  });
});

router.post("/register", async (req,res,next) => {
  const{username,email,password} = req.body

  try {
    await Users.create({username,email,password})
    res.redirect("/login")
    
  }catch (error) {
    
    req.flash("error",error.errors.map(error => error.message))

    res.render("./auth/register",{
      mensajes:req.flash(),
      title: 'Register',
      btn: "Registrarse",
      registro: true ,
      action: "/register",
      username,email,password
    })
  }

 
})

module.exports = router;
