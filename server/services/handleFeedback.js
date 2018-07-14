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
    return response;
  }).then(result => {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    return res.send(result);
  });

}

export function fetchBio(req, res) {

  return firebase.database().ref('/self').once('value').then(function(snapshot) {
    var response =  snapshot.val();
    return response;
  }).then(result => {
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    return res.send(result);
  });
}

export function sendFeedback(req, res) {
  const firstName = req.param('firstName');
  const lastName = req.param('lastName');
  const email = req.param('email');
  const phone = req.param('phone');
  const subject = req.param('subject');
  const message = req.param('message');

  writeUserFeeback(firstName, lastName, email, phone, subject, message);
  return ({feedback: 'success'});
}


export function writeUserFeeback(firstName, lastName, email, phone, subject, message) {
  const newChildRef = firebase.database().ref('feedback').push();
  newChildRef.set({
    firstName: firstName,
    email: email,
    phone : phone,
    lastName: lastName,
    subject: subject,
    message: message
  });
}
