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
router.use(methodOverride('_method'));
router.get('/' , (req,res) => {
  if(req.titleModel.getID == ''){
    req.flash('danger', "Login First!");
    res.redirect('/');
  }else{
  let titleModel = req.titleModel;
  const trans = transact.get('tHistory');
  const sers = service.get('servicePost');
  console.log(titleModel.getID);
  console.log(trans);
  const sample = trans.filter(function(transs){
      return Number(transs.sellerId) === Number(req.titleModel.getID) && transs.categoryName == "Service";
  });
  console.log('myPending OrderService')
  
  
  let sampleL=sample.length;
  console.log(sampleL)
  const orderList ={
      samp:titleModel,
      sample:sample,
      sampleL: sampleL,
      sers:sers
  }  
  res.render('myPendingOrderService.pug', orderList);
}
});

module.exports = router;