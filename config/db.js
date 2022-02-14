const {Sequelize} = require("sequelize")


const db = new Sequelize("loginnode","root","root",{
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: 0,
    define:{
        timestamps: 0
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    }
})

module.exports = db
