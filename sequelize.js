const Sequelize = require('sequelize')
const connection = new Sequelize('bands', 'root', 'root', {
  dialect: 'mysql'
  //storage: './db.sqlite3'
})

console.log('sequelize')
module.exports = connection