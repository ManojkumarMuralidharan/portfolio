/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app = admin.initializeApp(functions.config().firebase);
const ref = admin.database().ref()

const nodemailer = require('nodemailer');
let smtpConfig = {
    host: 'manoj.io',
    port: 465,
    secure: true, // use STARTTLS
    auth: {
        user: functions.config().email.username,
        pass: functions.config().email.password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
};

const mailTransport = nodemailer.createTransport(smtpConfig);
const APP_NAME = 'Manoj.io';

exports.sendWelcomeEmail = functions.database.ref('/feedback/{pushId}').onCreate((snap) => {
  const userInfo = snap.val();
  const email = 'manoj.wolfpack@gmail.com';//user.email; // The email of the user.
  const displayName = userInfo.firstName; //user.displayName; // The display name of the user.
  // [END eventAttributes]
  return sendWelcomeEmail(email, displayName).then(sendSelfEmail(userInfo));
});


function sendWelcomeEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <admin@manoj.io>`,
    to: email,
  };
  mailOptions.subject = `Thanks for your feedback - ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Thanks for visiting my site and checking out the cool stuff I have been upto. I hope you have enjoyed the experience. Keep watching for more interesting project and articles.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Welcome email sent to:', email);
  });
}


function sendSelfEmail(userInfo) {
  const subject = userInfo.subject;
  const message = userInfo.message;
  const phone = userInfo.phone;
  const firstName = userInfo.firstName;
  const lastName = userInfo.firstName;

  const mailOptions = {
    from: `${APP_NAME} <admin@manoj.io>`,
    to: 'manoj.wolfpack@gmail.com',
  };
  mailOptions.subject = `Feedback received from - ${lastName}, ${firstName}`;
  mailOptions.text = `Hey Manoj, </br> You have a new feedback. The feedback states " ${message} "`;
  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('Welcome email sent to:', email);
  });
}
