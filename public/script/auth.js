var user, name, email, photoUrl, uid;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('User is signed in.');
        user = firebase.auth().currentUser;
        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            uid = user.uid;
            $("#photoUrl_img").attr("src", photoUrl);
            $("#nameuser").html(name)
        }
        $("#page_login").hide();
        $("#init").show();
    } else {
        console.log('No User is signed in.')
        $("#page_login").show();
        $("#init").hide();
    }
})

function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}

function fn_sendUser() {
    if ($("#subscribe .email").val() && $("#subscribe .password").val()) {
        email = $("#subscribe .email").val();
        var password = $("#subscribe .password").val();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
    }
}

function fn_signIn() {
    if ($("#signIn .email").val() && $("#signIn .password").val()) {
        email = $(".email").val();
        var password = $("#signIn .password").val();
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });
    }
}

function fn_signOut() {
    firebase.auth().signOut().then(function() {
        $("#page_login").show();
        $("#container").hide();
    }, function(error) {
        console.log(error)
    });
}

function fn_sign(provider) {
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

$("#googleSignIn").click(function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    fn_sign(provider);

    /*firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });*/
})

$("#facebookSignIn").click(function() {
    var provider = new firebase.auth.FacebookAuthProvider();
    fn_sign(provider);
})
