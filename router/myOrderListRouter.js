const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const methodOverride = require('method-override');
// Initializes the data-2.json file with notes as its initial value if empty
const transact = new SimpleJsonStore('./transactionHistory.json');


router.get('/',(req,res) =>{
    if(req.titleModel.getID == ''){
        req.flash('danger', "Login First!");
        res.redirect('/');
    }else{
    let titleModel = req.titleModel;
    const trans = transact.get('tHistory');
    console.log(titleModel.getID);
    console.log(trans);
    const sample = trans.filter(function(transs){
        return (Number(transs.buyerId) === Number(req.titleModel.getID) && (transs.categoryName === 'Product'));
    });
    let sampleL=sample.length;
    const orderList ={
        samp:titleModel,
        sample:sample,
        sampleL: sampleL
    }
    res.render('myOrderList.pug',orderList )
}
});




module.exports = router;