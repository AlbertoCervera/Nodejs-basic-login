
const db = require("../config/db")
const Sequelize = require("sequelize")
const bcrypt = require("bcrypt")

const Users = db.define("users",{

    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    
    },
    username:{
        type: Sequelize.STRING,
        validate:{
            notEmpty:{
                msg:"El username no puede ir vacio."
            }
        },
        unique:{
            args:true,
            msg: "El Usuario ya existe."
        }
    },
    email:{
        type: Sequelize.STRING,
        validate:{
            isEmail:{
                msg:"Tienes que usar un email válido."
            }
        },
        unique:{
            args:true,
            msg: "Este email ya ha sido registrado."
        }
    },
    password:{
        type: Sequelize.STRING,
        validate:{
            notEmpty:{
                msg:"El password no puede ir vacio."
            }
        }
    }
},{
    hooks:{
        beforeCreate(Users){
            Users.password = bcrypt.hashSync(Users.password,bcrypt.genSaltSync(10))
        }
    }

})
Users.prototype.verificarPassword= function (password) {
    return bcrypt.compareSync(password,this.password)
}


module.exports = Users