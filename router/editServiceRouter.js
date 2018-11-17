const express = require('express');
const app = express();
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const bodyParser = require('body-parser');
const methodOverride =require('method-override');
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

router.use(methodOverride('_method'));
router.post('/', (req,res) => {
    let serviceId = req.body.serviceId;
    const serv = service.get('servicePost');
    console.log(serviceId);
    let serviceItem =serv.filter(function(servs) {
        return Number(servs.serviceId) === Number(serviceId);
    });
    let servss ={
        serviceItem: serviceItem
    }
    console.log(servss);
    res.render('editServ.pug',servss);
});

router.put('/:id', (req,res) => {
    let serviceId = req.params.id;
    const serv = service.get('servicePost');
    console.log(serv);
    console.log(req.body.serviceName);
    console.log('length '+serv.length);
    let productItem ={};
    for(let i = 0; i < serv.length;i++){
        
        if (Number(serv[i].serviceId) === Number(serviceId)){
            console.log(serv[i].serviceName);
            serv[i].service=req.body.serviceName;
            serv[i].description=req.body.description;
            serv[i].price=req.body.price;
            serv[i].type=req.body.servType;
        }
    }

    console.log(serv);
    service.set('servicePost', serv);
    req.flash('success',"Service Updated Succesfully!")
    res.redirect('/myServ');
});



module.exports = router;