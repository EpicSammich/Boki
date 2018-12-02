
(function(){
  //Initializing Firebase
  var config = {
    apiKey: "AIzaSyDu-NZmECvg8-0WLMwEe67hdTqNX8AN12I",
    authDomain: "boki-a2386.firebaseapp.com",
    databaseURL: "https://boki-a2386.firebaseio.com",
    projectId: "boki-a2386",
    storageBucket: "",
    messagingSenderId: "360814427555"
  };
  firebase.initializeApp(config);
//get ref to database
  var database = firebase.database(); 

  //Get elements from HTML DOM
  const txtEmail = document.getElementById('txtemail');
  const txtPassword = document.getElementById('txtpassword');
  const txtPasswordVerify = document.getElementById('txtpasswordverify');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');
  const txtfname = document.getElementById('txtfname');
  const txtlname = document.getElementById('txtlname');
  const txtportf = document.getElementById('txtportf');  
  const txtusername = document.getElementById('txtusername');
  const radusertype = document.getElementById('radusertype');




  //Event for login button press
  if(btnLogin != null){
    btnLogin.addEventListener('click', e => {
      //Get email and pass
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Sign In
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
    });
  }

  //Event for Sign Up button press
if(btnSignUp != null){
  btnSignUp.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const passverify = txtPasswordVerify.value;
    const auth = firebase.auth();
    //Verifying email address is properly formatted
    if(!(verifyEmail(email))){
      alert("Please type a valid email address.");
      txtEmail.value = '';
      return;
    }

    /*Verifying password validity with the following parameters:
      8 or more characters
      Must contain at least 1 character from each of the following categories:
      lowercase letters
      uppercase letters
      numbers
      special characters !@#$%^&*(),.?":{}|<>
    */
    //Password length
    if(pass.length < 8){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    //Lowercase
    else if(!(hasLowerCase(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    //Uppercase
    else if(!(hasUpperCase(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    //Numbers
    else if(!(hasNumber(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    //Special characters
    else if(!(hasSpecialChar(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    //Makes sure the password and passwordverify fields match
    if((pass !== passverify)){
      alert("Please make sure your passwords match.");
      txtPasswordVerify.value='';
      return;
    }
    //Sign up with Firebase
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
     //Create user profile in Database   
    firebase.database().ref('/userProfiles/' + txtusername.value).set({
    user_email: txtEmail.value,
    user_fname: txtfname.value,
    user_lname: txtlname.value,
    user_username: txtusername.value, 
    userportf: txtportf.value, 
    usertype: radusertype.value,
    userrate: 0,
    userrate_amount: 0,
    userrate_total: 0    
    });

  });
}


//Event for Sign Up button press
if(btnLogout != null){
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});
}
}());

  //Listens for a change in login/logout state.
  //If logging in and the email address has not been verified, an email is sent
  //so the user can verify it.
  //If logging in and the email address has been verified, it's logged in the
  //console that it's verified and the page redirects to the homepage.
  //If logging out, the page redirects to the login page.
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      if(firebaseUser.emailVerified){
        console.log('Email verified!');
      }
      else{
        //Send email
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        });
        console.log('Email not verified, email sent.');
      }
      if (window.location.href == 'http://localhost/index.html' ) {
        window.location.replace("http://localhost/homepage.html")
      }
    }else{
      console.log('not logged in');
      if (window.location.href == 'http://localhost/homepage.html' ) {
        window.location.replace("http://localhost/index.html")
      }
    }
  });


//Helper functions

//Verifies the email address is properly formatted
function verifyEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//returns true if the string has a lowercase letter
function hasLowerCase(str) {
    return (/[a-z]/.test(str));
}

//returns true if the string has an uppercase letter
function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

//returns true if the string has a number
function hasNumber(myString) {
  return /\d/.test(myString);
}

//returns true if the string has a special character !@#$%^&*(),.?":{}|<>
function hasSpecialChar(str){
  return /[!@#$%^&*(),.?":{}|<>]/g.test(str);
}
