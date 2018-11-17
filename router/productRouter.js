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
    var getID = titleModel.getID;
    console.log(getID);
    res.render('productPage.pug', titleModel);
}
});


router.post('/:id', (req, res) => {
    let titleModel = req.titleModel;
    const typ = req.body.tos;
    const prod = product.get('productPost');
    const idd = req.params.id;
    console.log(idd);

    prod.push({
      
        categoryName: "Product",
        userId: idd,
        productId: prod.length > 0 ? prod[prod.length-1].productId+1 : 1, 
        productName: req.body.nameofService,
        description: req.body.description,
        quantity: req.body.quantity,
        type: typ,
        shippingfee: req.body.shippingfee,
        price: req.body.price
    });
    
    product.set('productPost', prod);
    req.flash('success',"Product Added Successfully!")
    res.redirect('/product');

    
    
});

module.exports = router;