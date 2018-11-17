const express = require('express');
const app = express();
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const expressValidator = require('express-validator')
const session = require('express-session');
const flash = require('connect-flash');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');
const product = new SimpleJsonStore('./product.json');
const service = new SimpleJsonStore('./service.json');
const transact = new SimpleJsonStore('./transactionHistory.json');
//------------validate
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "hello",
    resave: true
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
      const products = product.get('productPost');
      const trans = transact.get('tHistory');
      console.log("GOOOOOOOOOOOOOOOOOOAL");
      console.log(req.body.pId);
      var pId = req.body.pId;
    if(products.length !== 0)
    {   
        console.log("may laman yung json products");
        for(let i = 0; i < products.length; i++)
        {
                console.log("LOOOOOOOOOOOOOOOOOOOOOOP");
                console.log(products[i].productId);
            if(Number(products[i].productId) === Number(pId))
            {
                console.log("maykaparehas");
                //if(Number(products[i].quantity === 0))
                //{
                //    console.log("0 yung quantity")
                    var newProducts = products.filter(function(prods){

                        return Number(prods.productId) === Number(pId);
                        });
                        var quantity = Number(newProducts[0].quantity);
                        newProducts[0].userId = req.body.uId;
                        newProducts[0].quantity += Number(req.body.qtity);
                        product.set('productPost', newProducts);   
                        var newTrans = trans.filter(function(transs){

                            return Number(transs.orderId) !== Number(req.body.orderId);
                            });
                        transact.set('tHistory',newTrans);
            // }
            }
        }
    }
    else
    {
       products.push({
                userId : req.body.uId,
                productId: req.body.pId,
                productName: req.body.pName,
                description: req.body.desc,
                type: req.body.typ,
                quantity: req.body.qtity,
                price: req.body.prc,
                shippingfee: req.body.shpf
                
            });
        product.set('productPost', products);  
        var newTrans = trans.filter(function(transs){

            return Number(transs.orderId) !== Number(req.body.orderId);
            });
        transact.set('tHistory',newTrans);
    }
});

module.exports = router;