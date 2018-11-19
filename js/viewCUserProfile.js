//This file will populate the current users page with their infomation
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
var db = firebase.database();
var ref = db.ref("/userProfiles/");
var user = firebase.auth().currentUser;

//Useful varibles
var firstname, lastname, username, userrole, userrating, usertotrate, useemail;


if(user != null)
    {
        console.log("inside");
     useemail = user.email;
     ref.orderByChild('user_email').equalTo(useemail).on("value", function(viewCProfile){
         viewCProfile.forEach(function (getthechild)
        {
             var valUser = getthechild.val();
             firstname = valUser.user_fname;
             lastname = valUser.user_lname;
             username = valUser.user_username;
             userrole = valUser.usertype;
             userrating = valUser.userrate;
             usertotrate = valUser.userrate_amount;
             document.getElementById("thisUserUname").innerHTML = username;
             document.getElementById("thisUserFname").innerHTML = firstname;
             document.getElementById("thisUserLname").innerHTML = lastname;
             document.getElementById("thisUserRole").innerHTML = userrole;
             document.getElementById("thisUserRating").innerHTML = userrating;
             document.getElementById("thisUserTotalRatings").innerHTML = usertotrate;
         });
     });
        
        
    }
  }
});