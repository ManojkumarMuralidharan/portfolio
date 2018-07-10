const firebase = require("firebase");
const _ = require("lodash");

const FirebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig);
}


export function fetchLocations(req, res) {

  return firebase.database().ref('/locations').once('value').then(function(snapshot) {
    var response =   {locations : _.values(snapshot.val())};
    return res.send(response);
  }).then(result =>  res.send(result)).catch(error => {
    console.log('inside error',error); throw error;
  });

}


export function writeUserFeeback(firstName, lastName, email, phone, subject, message) {
  var newChildRef = firebase.database().ref('feedback').push();
  newChildRef.set({
    firstName: firstName,
    email: email,
    phone : phone,
    lastName: lastName,
    subject: subject,
    message: message
  });
}
