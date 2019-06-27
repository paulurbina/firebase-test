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
      console.log(email);
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
  var content = document.getElementById('content');
  content.innerHTML = `
    <h1>Welcome brother!, using my web site :)</h1>

    <button class="btn btn-primary btn-sm" onclick="logout_config()">Cerrar session</button>
  `;
}

function logout_config() {
  firebase.auth().signOut()
    .then(function() {
      console.log('User existing...');
    })
    .catch(function (e) {
      console.log(e);
    });
}

// https://firebase.google.com/docs/auth/web/start