
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
    const serv = service.get('servicePost');
    
    console.log(titleModel.getID);

    
    const sample = prod.filter(function(prodd){
        return Number(prodd.userId) !== Number(titleModel.getID);
    });
    const sampleS = serv.filter(function(servv){
        return Number(servv.userId) !== Number(titleModel.getID);
    });
    let sampL = sample.length;
    let sampS = sampleS.length;
    const buyService ={
        samp:titleModel,
        sample:sample,
        sampL: sampL,
        sampleS: sampleS,
        sampS: sampS
    }
    console.log(buyService);

    
    res.render('buyService',buyService )
    }
});




module.exports = router;