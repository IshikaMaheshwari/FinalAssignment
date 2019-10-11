const Sequelize = require('sequelize')
const connection = require('./sequelize')


//class Users extends Model { }

const users = connection.define('users' ,{

      name:{
          type : Sequelize.STRING,
          allowNull : false
      } ,
      email:{
          type : Sequelize.STRING,
          primaryKey : true
      },
       
      college: {
          type : Sequelize.STRING
      },
      dateOfBirth : {
        type : Sequelize.STRING
    },
    password : {
        type : Sequelize.STRING
    }
    },{
        timestamps:false
    }
)
const bands = connection.define('bands' ,{

    bname:{
        type : Sequelize.STRING,
        allowNull : false
    } ,
    bid:{
        type : Sequelize.BIGINT,
        primaryKey : true,
        autoIncrement: true
    },
     
},{
    timestamps:false
}
)

users.hasMany(bands);


console.log('model')

module.exports = {connection,users,bands}
