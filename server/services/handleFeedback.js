const firebase = require('firebase');
const _ = require('lodash');

export const FirebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}


export const isResumeEnabled = () => firebase.database().ref('/resume').once('value').then((snapshot) => {
  const response = snapshot;
  return response;
});

export const handleResumeEnabled = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=2592000');
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
  isResumeEnabled().then((result) => {
    res.json(result);
  });
};

export const fetchLocations = (req, res) => firebase.database().ref('/locations').once('value').then((snapshot) => {
  const response = { locations: _.values(snapshot.val()) };
  return response;
})
  .then((result) => {
    res.setHeader('Cache-Control', 'public, max-age=2592000');
    res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
    return res.send(result);
  });

export const fetchBio = (req, res) => firebase.database().ref('/self').once('value').then((snapshot) => {
  const response = snapshot.val();
  return response;
})
  .then((result) => {
    res.setHeader('Cache-Control', 'public, max-age=2592000');
    res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
    return res.send(result);
  });


export const writeUserFeeback = (req, res) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { phone } = req.body;
  const { subject } = req.body;
  const { message } = req.body;
  const newChildRef = firebase.database().ref('feedback').push();
  newChildRef.set({
    firstName,
    email,
    phone,
    lastName,
    subject,
    message,
  });

  return res.send({ feedback: 'success' });
};


export const sendFeedback = (req, res) => {
  writeUserFeeback(req, res);
};

// export default {
//   handleResumeEnabled,
//   isResumeEnabled,
//   fetchLocations,
//   fetchBio,
//   sendFeedback,
//   writeUserFeeback,
// };
