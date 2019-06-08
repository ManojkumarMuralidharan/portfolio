const fetch = require('node-fetch');
const cache = require('./../redis/cache');


export function verifyCaptcha(req, res) {
  const token = req.body.token;
  const payload ={
    secret: process.env.googleCaptchav2secretKey,
    response:token
  };
  return fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${payload.secret}&response=${req.body['token']}`
  }).then(res => res.text())
    .then(res => JSON.parse(res))
    .then(response => {
        res.send(response);
    });
}
