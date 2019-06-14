const fetch = require('node-fetch');

export default function verifyCaptcha(req, res) {
  const { token } = req.body;
  const payload = {
    secret: process.env.googleCaptchav2secretKey,
    response: token,
  };
  return fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${payload.secret}&response=${req.body.token}`,
  }).then(response => response.text())
    .then(response => JSON.parse(response))
    .then((response) => {
      res.send(response);
    });
}
