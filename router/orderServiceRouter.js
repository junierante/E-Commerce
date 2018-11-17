const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const methodOverride = require('method-override');
const flash = require('connect-flash');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');
const product = new SimpleJsonStore('./product.json');
const service = new SimpleJsonStore('./service.json');
const transact = new SimpleJsonStore('./transactionHistory.json');



router.post('/' ,(req, res) => {
    const stor = store.get('users');
    var id = req.body.serviceId;
    var userId = req.body.userId;
    const services = service.get('servicePost');
    
    console.log("GEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEET");
    console.log(id);
    console.log(userId);
    var servItem = services.filter(function(servs){
        return Number(servs.serviceId) === Number(id);
    });
    var userSeller = stor.filter(function(seller){
        return Number(seller.id) === Number(userId);
        
    });
   
    console.log(servItem[0].userId);
    console.log(userSeller)
    var itemdetails = {
        servItem :servItem,
        userSeller: userSeller
    }


    res.render('orderService.pug', itemdetails);
});

module.exports = router;