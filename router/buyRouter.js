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

router.delete('/prod/:id', (req,res) => {
    if(req.titleModel.getID == []){
        req.flash('danger', "Login First!");
        res.redirect('/login');

    }else{

    const id = req.params.id;
    const products = product.get('productPost');

        console.log(id);
        var newProducts = products.filter(function(prods){

        return Number(prods.productId) !== Number(id);
        });
        console.log("WORKWORKWORK");

        product.set('productPost', newProducts);
        req.flash('Success', "Product has been bought");
        res.redirect('/buyProdServ');
    }
});



module.exports = router;