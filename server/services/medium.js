const fetch = require('node-fetch');

export function fetchMediumArticles(){
  return fetch('https://medium.com/@manoj.wolfpack/latest?format=json', {
    method: 'GET',
  }).then(res => res.text()).then(response => JSON.parse(response.substring(response.indexOf('>') + 1)));
}

export function handleMedium(req, res) {

  fetchMediumArticles().then(result =>  {
    res.json(result);
  });

}
