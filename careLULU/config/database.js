const Sequelize = require('sequelize')
let sequelize


if(process.env.NODE_ENV !== 'test'){
    sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
        dialect: 'mysql',
        host: 'mysql'
    })
}
else{
    console.log("creating tests db")
    sequelize = new Sequelize(process.env.MYSQL_TEST_DATABASE, process.env.MYSQL_TEST_USER, process.env.MYSQL_TEST_PASSWORD, {
        dialect: 'mysql',
        host: 'db-test'
    })
}



module.exports = sequelize
