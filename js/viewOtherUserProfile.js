//js for viewing other users profile
var theDB = firebase.database().ref("/userProfiles");
var otherFirstname, otherLastname, otherUsername, otherUserrole, otherUserrating, otherUsertotrate, otherUseemail, otherCuseremail, otherPortflink;

function getTheOtherUser(theURL) {
    var startSearch = theURL.indexOf("?")+1;
    var endSearch = theURL.length + 1;
    var theOtherUsername = theURL.slice(startSearch, endSearch -1);
    console.log(theOtherUsername);
    return theOtherUsername;
}




theDB.orderByKey().equalTo(getTheOtherUser(window.location.href)).on("value", function(viewOtherUserProfile){
    viewOtherUserProfile.forEach(function (getTheInfo)
    {
        var otherInfo = getTheInfo.val();
        otherFirstname = otherInfo.user_fname;
        otherLastname = otherInfo.user_lname;
             otherUsername = otherInfo.user_username;
             otherUserrole = otherInfo.usertype;
             otherUserrating = otherInfo.userrate;
             otherUsertotrate = otherInfo.userrate_amount;
             otherCuseremail = otherInfo.user_email;
             otherPortflink = otherInfo.userportf;
             document.getElementById("thisUserUname").innerHTML = otherUsername;
             document.getElementById("thisUserFname").innerHTML = otherFirstname;
             document.getElementById("thisUserLname").innerHTML = otherLastname;
             document.getElementById("thisUserCemail").innerHTML = otherCuseremail;
             document.getElementById("thisUserPortf").innerHTML = otherPortflink;
             document.getElementById("thisUserRole").innerHTML = otherUserrole;
             document.getElementById("thisUserRating").innerHTML = otherUserrating;
             document.getElementById("thisUserTotalRatings").innerHTML = otherUsertotrate;    
    });
});