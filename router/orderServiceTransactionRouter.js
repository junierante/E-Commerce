const express = require('express');
const app = express();
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const store = new SimpleJsonStore('./users.json');
const product = new SimpleJsonStore('./product.json');
const service = new SimpleJsonStore('./service.json');
const transact = new SimpleJsonStore('./transactionHistory.json');
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
router.post('/' ,(req, res) => {

    const sellerId = req.body.sellerId; 
    const id = req.body.serviceId;
    const stor = store.get('users');
    const trans = transact.get('tHistory');
    let titleModel = req.titleModel;
    trans.push({
    buyerId: titleModel.getID,
    orderId: trans.length > 0 ? trans[trans.length -1].orderId + 1: 1,
    serviceId: id,
    sellerId: sellerId,
    name: req.body.serviceName,
    description: req.body.description,
    status: "Pending..",
    price: req.body.price,
    seller: req.body.sellerName,
    categoryName: "Service",
    buyerName: stor[(Number(titleModel.getID) - 1)].firstName + " " + stor[(Number(titleModel.getID) - 1)].lastName

    });
    transact.set('tHistory',trans);
    req.flash('success', "Services has been bought");
    res.redirect('/buyService');
        
});

module.exports = router;