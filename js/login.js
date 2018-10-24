
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

  //Get elements
  const txtEmail = document.getElementById('txtemail');
  const txtPassword = document.getElementById('txtpassword');
  const txtPasswordVerify = document.getElementById('txtpasswordverify');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');



  //Add login event
  btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign In
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });


  //Add signup event
  btnSignUp.addEventListener('click', e => {
    //Get email and pass
    //TODO: Check for real email!
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const passverify = txtPasswordVerify.value;
    const auth = firebase.auth();
    //Verifying email address is validity
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
    if(pass.length < 8){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    else if(!(hasLowerCase(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    else if(!(hasUpperCase(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    else if(!(hasNumber(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }
    else if(!(hasSpecialChar(pass))){
      alert("Please choose a more secure password. It should be longer than 8 characters, unique to you, and difficult for others to guess.");
      txtPassword.value='';
      txtPasswordVerify.value='';
      return;
    }

    if((pass !== passverify)){
      alert("Please make sure your passwords match.");
      txtPasswordVerify.value='';
      return;
    }
    //Sign up
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  });



  //Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      btnLogout.classList.remove('invisible');
      btnLogin.classList.add('invisible');
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
    }else{
      console.log('not logged in');
      btnLogout.classList.add('invisible');
      btnLogin.classList.remove('invisible');
    }
  });



  //Add logout event
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });
}());


//Helper functions that make the thing do the things

function verifyEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function hasLowerCase(str) {
    return (/[a-z]/.test(str));
}

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function hasSpecialChar(str){
  return /[!@#$%^&*(),.?":{}|<>]/g.test(str);
}
