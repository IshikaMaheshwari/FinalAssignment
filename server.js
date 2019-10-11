const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const connectionUsers = require('./model')
const sequelize = require('sequelize')
app.set("view engine", "hbs");

app.use(
  session({
    // use redis/mongodb/postgres store
    secret: "nobody should guess this",
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

const loggedInOnly = (failure = "/signup") => (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
      console.log('failure')
    res.redirect(failure);
  }
};

app.get("/",loggedInOnly(),(req, res) => {
    console.log("get //")
  res.render("index", {
    name: req.session.user.username
  })
})
// app.get('/',function(req,res) {
//     res.end('Hi server')
// })


app.get("/signup", (req, res) => {
  // connectionUsers.sync().then(()=>{
  //   console.log('databse connection done..............')
  // })
    console.log("get /signup")
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});
app.get("/login", (req, res) => {
    console.log("get /login")
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

app.post("/login", (req, res) => {
    console.log("post /")
  const { username, password } = req.body;
  // Make this comparision in DB
  connectionUsers.users.findByPk(username).then(user => {
    // project will be an instance of Project and stores the content of the table entry
    // with id 123. if such an entry is not defined you will get null
    if(user!=null && user.dataValues.password==password) {
        req.session.user = {
            id: 1,
            username: user.dataValues,
            about: "mentor, developer and reader"
          };
      
          res.redirect("/");
         // res.render("index");
        } else {
          res.sendStatus(401);
        }

    }
  )
})


app.post("/signup", (req, res) => {
    console.log("post /")
  const { username, password ,college ,email ,birth} = req.body;
  // Make this comparision in DB
//   if (username == "ishika" && password == "1234567") {
//     req.session.user = {
//       id: 1,
//       username: "ishika",
//       about: "mentor, developer and reader"
//     };
console.log(username)
  connectionUsers.connection.sync().then(() => 
    connectionUsers.users.create({
        name : username,
        email:email,
        college: college,
        dateOfBirth : birth,
        password : password
      })
    ).catch(function (error){
      console.log(error)
    }) 
    
    res.redirect("/login");
   // res.render("index");
  } 
);


app.post("/create", (req, res) => {
  console.log("post /create")
const {bands,uname} = req.body;
connectionUsers.connection.sync().then(() => 
    connectionUsers.bands.create({
        bname : bands,
        userEmail : uname
      })
    ).catch(function (error){
      console.log(error)
    }) 
    
    res.redirect("/login");


})

app.listen(8080,function() {
    console.log('hi')
});