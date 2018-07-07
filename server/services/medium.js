const fetch = require('node-fetch');

export function handleMedium(req, res) {

  return fetch('https://medium.com/@manoj.wolfpack/latest?format=json', {
    method: 'GET',
  }).then(res => res.text())
  .then(result =>  {
    const responseJson = JSON.parse(result.substring(result.indexOf('>') + 1));
    res.json(responseJson);
  });

}
