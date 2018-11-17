const express = require('express');
const router = express.Router(); 
const app = express();
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./users.json',{users:[]});

var getID = [];



router.post('/', function(req, res) {
    let titleModel = req.titleModel;
    var getID = req.titleModel.getID;

    const users = store.get('users');
    
	let check = false;
	const registerInput= {
		usernameL : req.body.usernameL,
        passwordL : req.body.passwordL,
        
    }
    
   
    for(let i = 0; i < users.length; i++) {
        if(registerInput.usernameL == users[i].username && registerInput.passwordL == users[i].password){
            check = true;
            
            console.log('hello');
            
            
            break;
        }
    }
    
    getID = registerInput.usernameL;

    console.log(check);
    console.log(titleModel);
    res.redirect('/home');

});


module.exports = router;