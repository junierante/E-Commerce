
(function(){
	var signInForm = document.getElementById('register');
	 signInForm.addEventListener('click',function(event){
		//event.preventDefault();
    console.log("ew");
		 var firstName = document.getElementById('form-first-name');
         var lastName = document.getElementById('form-last-name');
         var email = document.getElementById('form-email');
         var number = document.getElementById('form-number');
         var username = document.getElementById('form-username');
         var password = document.getElementById('form-password');
         var address = document.getElementById('form-address');
   		 axios.post('/register', {

                firstName : firstName.value,
                lastName : lastName.value,
                email : email.value,
                number : number.value,
                username : username.value,
                password : password.value,
                address : address.value
            })
   		.then(function(res) {
          if(res.data === true){
            alert("Sucessfully Created an Account!");
            window.location.href = "/";  
          }
          else{
            alert("Email or Username already used!");
            window.location.href = '/';
          }
         
    		  
      	})
      	.catch(function(err) {
        		//user = [];
      	});
  }); 	

})();