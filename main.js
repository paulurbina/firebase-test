function register_config() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        
      });
}

function login_config() {
  var emailTwo = document.getElementById('emailTwo').value;
  var passwordTwo = document.getElementById('passwordTwo').value;

  firebase.auth().signInWithEmailAndPassword(emailTwo, passwordTwo).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    console.log(errorCode);
    console.log(errorMessage);
    
  });
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Existing user');
      show();
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
      console.log('Not existing user');
      
    }
  });
}

observador();

function show() {
  var content = document.getElementById('content').value;
  content.innerHTML  = 'solo usuario activo';
}
