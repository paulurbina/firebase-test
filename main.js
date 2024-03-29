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

addDataMemories.addEventListener('click', addDataMemoriesFunc);

function addDataMemoriesFunc() {
  console.log('click function');
  var data = {
    title: document.querySelector('#title').value,
    description: document.querySelector('#description').value
  };
  // let title = document.querySelector('#title').value || '';
  // let description = document.querySelector('#description').value || '';
  if (title === '' || description === '') {
    alert('adding data from form!');
  } else {
    db.collection('notes').add({
      title: data.title,
      description: data.description
    })
    .then(function (docRef) { 
      console.log("id", docRef.id);
      console.log(docRef);
      document.querySelector('#title').value = '';
      document.querySelector('#description').value = '';
    })
     .catch(function(err) {
       console.error("error adding document", error);
     })
  }

}


// Read Data
let dataBody = document.getElementById('dataBody');
db.collection("notes").onSnapshot((querySnapshot) => {
  dataBody.innerHTML = '';
  querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().title}`);
      dataBody.innerHTML += `
      <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().title}</td>
        <td>${doc.data().description}</td>
        <td>
          <button  class="btn btn-danger btn-sm" onclick="deleteItem('${doc.id}')">Delete</button>
        </td>
        <td>
          <button  class="btn btn-warning btn-sm" onclick="editItem('${doc.id}', '${doc.data().title}', '${doc.data().description}')">Edit</button>
        </td>
      </tr>
      `
  });
});

// Delete data
function deleteItem(id){
  db.collection("notes").doc(id).delete().then(function() {
    console.log("Note successfully deleted!");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

// update data item

function editItem(id, title, description) {
  document.getElementById('title').value = title;
  document.getElementById('description').value = description;
  let buttom = document.getElementById('addDataMemories');
  buttom.innerHTML = 'Edit';

  buttom.onclick = function() {
    var washingtonRef = db.collection("notes").doc(id);

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
      title: title,
      description: description
    })
    .then(function() {
        console.log("Note successfully updated!");
        buttom.innerHTML = "Save";
        document.querySelector('#title').value = '';
        document.querySelector('#description').value = '';
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating Note: ", error);
    });
  }
}

