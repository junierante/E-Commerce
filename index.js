const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const port = 2500;
const app = express();
const axios = require('axios');
const dateTime = require('node-datetime');
const dt = dateTime.create();
global.dateTime = dt.format('Y-m-d H:M:S');
//--------------------------routers-------------------------
const session =require('express-session');
const indexRouter = require('./router/indexRouter');
const registerRouter = require('./router/registerRouter');
const loginRouter = require('./router/loginRouter');
const serviceRouter = require('./router/serviceRouter');
const productRouter = require('./router/productRouter');
const myProdServRouter = require('./router/myProdServRouter');
const myServRouter = require('./router/myServRouter');
const deleteRouter = require('./router/deleteRouter');
const editProductRouter = require('./router/editProductRouter');
const editServiceRouter = require('./router/editServiceRouter');
const buyProdServ = require('./router/buyProdServRouter');
const buyServiceRouter = require('./router/buyServiceRouter');
const orderProdRouter = require('./router/orderProdRouter');
const orderServRouter = require('./router/orderServiceRouter');
const myPendingOrderProductRouter = require('./router/myPendingOrderProductRouter');
const myPendingOrderServiceRouter = require('./router/myPendingOrderServiceRouter');
const statusPendingProductRouter = require('./router/statusPendingProductRouter');
const orderTransactionRouter = require('./router/orderTransactionRouter');
const orderServiceTransactionRouter = require('./router/orderServiceTransactionRouter');
const statusReceivedRouter = require('./router/statusReceivedRouter');
const myOrderListRouter = require('./router/myOrderListRouter');
const myServiceOrderListRouter = require('./router/myServiceOrderListRouter');
const cancelOrderRouter = require('./router/cancelOrderRouter');
const userProfileRouter = require('./router/userProfileRouter');
const logout = require('./router/logout');
const statusConfirmedServiceRouter = require('./router/statusConfirmedServiceRouter');

//---------------------------------------------------------
const SimpleJsonStore = require('simple-json-store');
const store = new SimpleJsonStore('./users.json',{users:[]});
const prod = new SimpleJsonStore('./service.json',{productPost:[]});
const serv = new SimpleJsonStore('./product.json',{servicePosst:[]});
const expressValidator = require('express-validator')
const flash = require('connect-flash');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var getid = [];
app.use((req, res, next) => {
	req.titleModel = {
        title: 'ECOM',
        //value ng getid na dneclare sa taas mappunta dto sa getID
		getID: getid
	}
    next();
    
});
//------------validate
app.use(session({
    secret: "hello",
    resave: true,
    saveUninitialized: false
  }))
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
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');
  //----------------------------------------
app.post('/', function(req, res) {
    let titleModel = req.titleModel;
    const users = store.get('users');
    var check ='/';
    for(var i = 0; i < users.length; i++) {
        if(req.body.usernameL == users[i].username && req.body.passwordL == users[i].password){
            //ung value getid ung mappunta sa var n dneclare sa taas
            getid = users[i].id;
            console.log(getid);
            console.log('success login');
            check ='/home';
            
           
            break;
        }else{
            console.log('Incorrect user or pw');
            
        }
        
    }
    if(check == '/'){
      req.flash('danger',"Username or Password is Incorrect!");
    }
    res.redirect(check);


});


app.use('/',indexRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/service', serviceRouter);
app.use('/product', productRouter);
app.use('/myProdServ',myProdServRouter);
app.use('/myServ',myServRouter);
app.use('/updateProd',editProductRouter);
app.use('/updateServ',editServiceRouter);
app.use('/delete',deleteRouter);
app.use('/buyProdServ', buyProdServ);
app.use('/buyService', buyServiceRouter);
app.use('/orderProduct', orderProdRouter);
app.use('/orderService', orderServRouter);
app.use('/myPendingOrderProduct', myPendingOrderProductRouter);
app.use('/myPendingOrderService', myPendingOrderServiceRouter);
app.use('/statusPendingProduct', statusPendingProductRouter);
app.use('/statusReceived', statusReceivedRouter);
app.use('/orderTransaction', orderTransactionRouter);
app.use('/orderServiceTransaction', orderServiceTransactionRouter);
app.use('/myOrderList', myOrderListRouter);
app.use('/myServiceOrderList', myServiceOrderListRouter);
app.use('/statusConfirmedService', statusConfirmedServiceRouter);
app.use('/cancelOrder', cancelOrderRouter);
app.use('/userProfile', userProfileRouter);
app.use('/logout', logout);

app.listen(port,(err) =>{
	if(err){
		return console.log(err);
	}
	console.log(`Listening to ${port}...`);
});