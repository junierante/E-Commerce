
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const methodOverride = require('method-override');
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
    const servs = service.get('servicePost');
    
    console.log('getID = '+titleModel.getID);

    
    const sample = prod.filter(function(prodd){
        return Number(prodd.userId) !== Number(titleModel.getID) && Number(prodd.quantity) !==0 ;
    })
    
    let sampL = sample.length;
    const serv= servs.filter(function(servss){
        return Number(servss.userId) !== Number(titleModel.getID);
    });
    let servL = serv.length;
    const buyProdServ ={
        samp:titleModel,
        serv: serv,
        prod: prod,
        sample:sample,
        sampL: sampL,
        servL : servL
    }
    console.log(buyProdServ);
    res.render('buyProdServ',buyProdServ)
}
});




module.exports = router;