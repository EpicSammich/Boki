
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
    const auth = firebase.auth();
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
