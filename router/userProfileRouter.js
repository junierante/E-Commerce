const express = require('express');
const app = express();
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const bodyParser = require('body-parser');

const store = new SimpleJsonStore('./users.json', { users: [] });
const product = new SimpleJsonStore('./product.json', { productPost: []});
const expressValidator = require('express-validator')
const session = require('express-session');
const flash = require('connect-flash');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
//------------validate
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "hello",
    resave: true,
    saveUninitialized: false
  }));
  app.use(require('connect-flash')());
  app.use(function(req, res, next){
     res.locals.messages = require('express-messages')(req, res);
     next();
  });
  app.use(expressValidator({
    errorFormatter: function(param, msg , value){
      var namespace = param.splice('.'),
      root = namespace.shift(),
      formParam = root;
      while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
  
      }return {
        param: formParam,
        msg: msg,
        value:value
      };
    }
  }));
  //----------------------------------------
router.get('/', (req,res) => {
  if(req.titleModel.getID == ''){
    req.flash('danger', "Login First!");
    res.redirect('/');
  }else{
    let titleModel = req.titleModel;
    const users = store.get('users');
    var getID = titleModel.getID;
    var userDetails = users.filter(function(userss){
        return Number(userss.id) === Number(getID);
    });
    console.log(userDetails);
    const details={
        details:userDetails
    }
    console.log(details);
    res.render('userProfile.pug', details);
  }
});

router.post('/', (req,res) => {
    if(req.titleModel.getID == ''){
      req.flash('danger', "Login First!");
      res.redirect('/');
    }else{
      let titleModel = req.titleModel;
      const users = store.get('users');
      var getID = titleModel.getID;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let email = req.body.email;
      let number = req.body.number;
      let username = req.body.username;
      let password = req.body.password;
      let address = req.body.address;
      /*for(let i = 0;i < users.length ; i++ ){
        if(Number(users[i].id) == Number(getID) )  {
            users[i].firstName = firstName;
            users[i].lastName = lastName;
            users[i].number = number;
            users[i].password = password;
            users[i].address = address;

        }
      }*/
      let details = {
          firstName : firstName,
          lastName : lastName,
          number : number,
          password : password,
          address : address

      }
      //req.flash('success', "Edit Success!");
      //store.set('users',users);
      //console.log(users);
      console.log(details);
      res.render('editUserProfile.pug',details);
    }
  });

  router.post('/edit', (req,res) => {
    if(req.titleModel.getID == ''){
      req.flash('danger', "Login First!");
      res.redirect('/');
    }else{
      let titleModel = req.titleModel;
      const users = store.get('users');
      var getID = titleModel.getID;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
   
      let number = req.body.number;
      let password = req.body.password;
      let address = req.body.address;
      for(let i = 0;i < users.length ; i++ ){
        if(Number(users[i].id) == Number(getID) )  {
            users[i].firstName = firstName;
            users[i].lastName = lastName;
            users[i].number = number;
            users[i].password = password;
            users[i].address = address;

        }
      }
  
      req.flash('success', "Edit Success!");
      store.set('users',users);
      //console.log(users);
      
      res.redirect('/userProfile');
    }
  });
module.exports = router;