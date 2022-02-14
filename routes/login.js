var express = require('express');
var router = express.Router()

const passport = require("passport");

/* GET home page. */
router.get('/login', function(req, res, next) {
  const {error} = res.locals.mensajes

  res.render('./auth/login', { 
    title: 'Login',
    btn: "Entrar",
    action: "/login",
    error
  });
});

router.post('/login', 
  passport.authenticate('local', { 
  successRedirect:"/",
  failureRedirect: '/login',
  failureFlash: true,
  badRequestMessage: "No puede dejar los campos vacios"
  })
)

router.get("/cerrar-sesion",(req,res,next)=> {
  req.session.destroy(()=>{
    res.redirect("/login")
  })

})
  
module.exports = router;
