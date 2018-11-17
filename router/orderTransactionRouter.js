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
router.put('/' ,(req, res) => {
    var inputQuantity = Number(req.body.inputQuantity);
    var quantity = Number(req.body.quantity);
    const sellerId = req.body.sellerId; 
    const id = req.body.productId;
    const stor = store.get('users');
      console.log(inputQuantity);
      console.log(quantity);
        if(inputQuantity > quantity)
        {
            console.log(quantity - inputQuantity);
            req.flash('danger',"Input is Higher that quantity of Product!");
            res.redirect('/buyProdServ'); 
        }
        else
        {
              
            
            const products = product.get('productPost');
            const trans = transact.get('tHistory');
            quantity -= inputQuantity;
            if(quantity === 0)
            {
                 console.log(id);
                  /*var newProducts = products.filter(function(prods){

                    return Number(prods.productId) === Number(id);
                  });
                  */
                  for(let i = 0; i < products.length; i++){
                    if(Number(products[i].productId) == Number(id)){
                      products[i].quantity = quantity;
                      product.set('productPost',products);
                      console.log(products[i].productId);
                      console.log(id);
                      req.flash('success', "Product has been bought");
                      res.redirect('/buyProdServ');
                    }
                  }
                  console.log("WORKWORKWORK");


                       //product.set('productPost', newProducts);
                      // req.flash('success', "Product has been bought");
                       //res.redirect('/buyProdServ');
            }
            else
            {
              console.log("MAY TIRA!!");
              for(let i = 0; i < products.length; i++)
              {
                console.log(i);
                if(Number(products[i].productId) == Number(id))
                {
                  products[i].quantity = quantity;

                  product.set('productPost',products);
                  console.log(products[i].productId);
                  console.log(id);
                  req.flash('success', "Product has been bought");
                  res.redirect('/buyProdServ');
                }
              }
            }
            let titleModel = req.titleModel;
            trans.push({
              buyerId: titleModel.getID,
              orderId: trans.length > 0 ? trans[trans.length -1].orderId + 1: 1,
              productId: id,
              sellerId: sellerId,
              name: req.body.productName,
              description: req.body.description,
              quantity: req.body.inputQuantity,
              status: "Pending..",
              price: req.body.price,
              shippingfee: req.body.shippingfee,
              seller: req.body.sellerName,
              categoryName: "Product",
              buyerName: stor[(Number(titleModel.getID) - 1)].firstName + " " + stor[(Number(titleModel.getID) - 1)].lastName


            });
               transact.set('tHistory',trans);
               
            console.log(quantity);
        }
});

module.exports = router;