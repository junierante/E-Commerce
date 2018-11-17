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
router.post('/', (req,res) => {
    let productId = req.body.productId;
    const prod = product.get('productPost');
    console.log(productId);
    let productItem =prod.filter(function(prods) {
        return Number(prods.productId) === Number(productId);
    });
    let prodss ={
        productItem: productItem
    }
    console.log(prodss);
    res.render('edit.pug',prodss);
});

router.put('/:id', (req,res) => {
    let productId = req.params.id;
    const prod = product.get('productPost');
    console.log(prod);
    console.log(req.body.prodName);
    console.log('length '+prod.length);
    let productItem ={};
    for(let i = 0; i < prod.length;i++){
        
        if (Number(prod[i].productId) === Number(productId)){
            console.log(prod[i].productName);
            prod[i].productName=req.body.prodName;
            prod[i].description=req.body.prodDescription;
            prod[i].quantity=req.body.prodQuantity;
            prod[i].price=req.body.prodPrice;
            prod[i].type=req.body.prodType;
            prod[i].shippingfee=req.body.shipFee;

        }
    }

    console.log(prod);
    product.set('productPost', prod);
    req.flash('success',"Product Updated Succesfully!")
    res.redirect('/myProdServ');
});



module.exports = router;