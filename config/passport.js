
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy


const Users = require("../models/users") 

passport.use(
    new LocalStrategy(
        //Por default passport desea un usuario y contraseña
        // {
        //     usernameField: "username",
        //     passwordField: "password"
        // },
        async (username,password,done) => {
            try{
                //Esto indica si existe el usuario
                const usuario = await Users.findOne({
                    where: {username:username}
                })

                //Si existe el usuario, pero el password es incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message: "Password incorrecto"
                    })
                }

                //El username existe y password es correcto

                return done(null,usuario)

            }catch(error){
                return done(null,false,{
                    message: "Esta cuenta no existe"
                })
            }
        }
    )
)

//Serializar el usuario

passport.serializeUser((usuario,callback) => {
    callback(null,usuario)
})


//deserializar el usuario

passport.deserializeUser((usuario,callback) => {
    callback(null,usuario)
})

module.exports = passport