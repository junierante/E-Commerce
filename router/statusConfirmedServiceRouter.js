const express = require('express');
const app = express();
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const bodyParser = require('body-parser');
const methodOverride =require('method-override');
const expressValidator = require('express-validator')
const session = require('express-session');
const flash = require('connect-flash');
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');
const product = new SimpleJsonStore('./product.json');
const service = new SimpleJsonStore('./service.json');
const transact = new SimpleJsonStore('./transactionHistory.json');


router.post('/',(req,res) =>{
   
    const prod = product.get('productPost');
    const serv = service.get('servicePost');
    const trans = transact.get('tHistory');
    let productId = req.body.productId;
    let orderId= req.body.orderId;
    
    for(let i  = 0; i <trans.length; i++){
        if(trans[i].orderId == orderId ){
            trans[i].status = 'Confirmed';
            transact.set('tHistory',trans);
        }
    }
    
    req.flash('success',"Success!");
    res.redirect('/statusConfirmedService')
});

module.exports = router;