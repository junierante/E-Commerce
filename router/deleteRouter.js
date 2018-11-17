const express = require('express');
const app = express();
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const bodyParser = require('body-parser');
const methodOverride =require('method-override');
const store = new SimpleJsonStore('./users.json', { users: [] });
const product = new SimpleJsonStore('./product.json', { productPost: []});
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
router.delete('/prod/:id', (req, res) => {
    console.log('pmasok');
    const prod = product.get('productPost');
    const id = req.params.id;
    
    console.log(id);
    console.log(prod);
    var newProd = prod.filter( function(prods) {
      return Number(prods.productId) !== Number(id);
    });

    product.set('productPost', newProd);
    console.log(newProd);
    req.flash('success',"Product Delete Successfull!")
    res.redirect('/myProdServ');

});
router.use(methodOverride('_method'));
router.delete('/serv/:id', (req, res) => {
    console.log('pmasok service');
    const serv = service.get('servicePost');
    const id = req.params.id;
    
    console.log(id);
    console.log(serv);
    var newServ = serv.filter( function(servs) {
      return Number(servs.serviceId) !== Number(id);
    });
    
    service.set('servicePost', newServ);
    req.flash('success',"Service Delete Successfull!")
    res.redirect('/myProdServ');

    
    
});

module.exports = router;