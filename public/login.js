
const express = require('express');
const router = express.Router(); 
const app = express();
const SimpleJsonStore = require('simple-json-store');

var getID = [];



(function(){
  var signInForm = document.getElementById('login');
  

	 signInForm.addEventListener('click',function(event){
		 //gets the value by id
         var usernameL = document.getElementById('form-usernameL');
         var passwordL = document.getElementById('form-passwordL');
        
   		 axios.post('/login', {
                usernameL : usernameL.value,
                passwordL : passwordL.value,
              
            })
   		.then(function(res) {
          if(res.data === true){
            alert("Login Succesful!");
            window.location.href = '/home';  
          }
          else{
						alert("Wrong Username or Password!");  
						window.location.href = '/';
          }
      	})
      	.catch(function(err) {
        		//user = [];
      	});
  }); 
})();

