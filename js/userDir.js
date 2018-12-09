//js for dirctory

var allUsers = [];
var userdb = firebase.database().ref("userProfiles/");

function fillAllUser() {
userdb.on('value', function(snapshot)
         { 
    snapshot.forEach(function (findthekey)
                    {
        var tempUser = findthekey.val().user_username;
        allUsers.push(tempUser);
        document.getElementById("ouser"+allUsers.length).innerHTML = tempUser.link("/otherUserProfile.html?"+tempUser);
    });
});
    return;
}


fillAllUser();
