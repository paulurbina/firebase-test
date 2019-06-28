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

        const contentErrorRegister = document.querySelector('#contentErrorRegister');
        contentErrorRegister.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Register well </strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        `;
        
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
      var content = document.getElementById('content');
      content.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Session close</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
    })
    .catch(function (e) {
      console.log(e);
    });
}

function checkEmail() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function() {
    // Email sent.
    var content = document.getElementById('content');
    content.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>E-mail sent</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    `;
    
  }).catch(function(error) {
    // An error happened.
  });
}

// https://firebase.google.com/docs/auth/web/start

// *
// *
// *
// *
// *
// *

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var addDataMemories = document.getElementById('addDataMemories');

function addDataMemoriesFunc(event) {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

  db.collection("notes").add({
    title: title,
    description: description,
    // born: 1815
  })
  .then(function(docRef) {
      // console.log("Document written with ID: ", docRef.id);
      console.log(docRef);
      console.log('adding firestore');
      document.querySelector('#title').value = '';
      document.querySelector('#description').value = '';
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}