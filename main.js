function register_config() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      checkEmail();
    })
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

  firebase.auth().signInWithEmailAndPassword(emailTwo, passwordTwo)
  .then(function () {})
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    console.log(errorCode);
    console.log(errorMessage);

    var content = document.getElementById('content');
    content.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>there is no user!</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `

    
  });
}

function observador() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Existing user');
      show(user);
      var displayName = user.displayName;
      var email = user.email;
      console.log(email);
      var emailVerified = user.emailVerified;
      console.log('****************');
      console.log('verificado: ',emailVerified);
      console.log('****************');
      
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

function show(user) {
  var user = user;
  var content = document.getElementById('content');
  if(user.emailVerified) {
    content.innerHTML = `
    <div class="alert alert-success" role="alert">
      <h6><strong>Email : </strong>${user.email}</h6>
      <p>
      <strong>Id Name: </strong>${user.uid} <br>
      <strong>Email Verified: </strong>${user.emailVerified ? "check" : "Do it now"}
      </p>
    </div>
    <button class="btn btn-primary btn-sm" onclick="logout_config()">Cerrar session</button>
  `;
  }
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

function checkEmail() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('Send email');
    
  }).catch(function(error) {
    // An error happened.
  });
}

// https://firebase.google.com/docs/auth/web/start