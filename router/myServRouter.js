
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');
const product = new SimpleJsonStore('./product.json');
const service = new SimpleJsonStore('./service.json');

router.get('/',(req,res) =>{
    if(req.titleModel.getID == ''){
        req.flash('danger', "Login First!");
        res.redirect('/');
    }else{
    let titleModel = req.titleModel;
    const prod = product.get('productPost');
    const serv = service.get('servicePost');
    console.log(titleModel.getID);
    let productItem =prod.filter(function(prods) {
        return Number(prods.userId) === Number(titleModel.getID);
    });
    let serviceItem =serv.filter(function(servs) {
        return Number(servs.userId) === Number(titleModel.getID);
    });
    let pLength = productItem.length;
    let sLength = serviceItem.length;
    const sample ={
        samp:titleModel,
        serv: serviceItem,
        prod: productItem,
        prodL :pLength,
        servL : sLength
    }
    res.render('myServ',sample )
}
});

module.exports = router;