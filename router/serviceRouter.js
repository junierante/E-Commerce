const express = require('express');
const app = express();
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const bodyParser = require('body-parser');

const store = new SimpleJsonStore('./users.json', { users: [] });
const service = new SimpleJsonStore('./service.json', { servicePost: []});
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
    var getID = titleModel.getID;
    console.log(getID);
    res.render('servicePage.pug', titleModel);
  }
});


router.post('/:id', (req, res) => {
    let titleModel = req.titleModel;
    const typ = req.body.tos;
    const sers = service.get('servicePost');
    const idd = req.params.id;
    console.log(idd);
   
    sers.push({
        
        categoryName: "Service",
        userId: idd,
        serviceId: sers.length > 0 ? sers[sers.length-1].serviceId +1: 1, 
        serviceName: req.body.nameofService,
        description: req.body.description,
        type: typ,
        price: req.body.price,
        mobilenumber: req.body.mobilenumber
    });
    
    service.set('servicePost', sers);
    req.flash('success',"Service Added Successfully!")
    res.redirect('/service');
    
    
});

module.exports = router;