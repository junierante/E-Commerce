const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const methodOverride = require('method-override');
const flash = require('connect-flash');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');
const product = new SimpleJsonStore('./product.json');
const service = new SimpleJsonStore('./service.json');

router.use(methodOverride('_method'));


router.post('/' ,(req, res) => {
    let titleModel = req.titleModel;
    const stor = store.get('users');
    var id = req.body.productId;
    var userId = req.body.userId;
    const products = product.get('productPost');
    
    console.log("GEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET");
    console.log(id);
        
    var orderItem = products.filter(function(prods){
        return Number(prods.productId) === Number(id);
    });
    var userSeller = stor.filter(function(seller){
        return Number(seller.id) === Number(userId);
        
    });
   
    console.log(orderItem[0].userId);
    console.log('seller id:'+ userSeller[0].id)
    var itemdetails = {
        orderItem :orderItem,
        userSeller: userSeller,
    }


    res.render('orderProduct.pug', itemdetails);
});

module.exports = router;