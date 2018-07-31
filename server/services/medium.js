const fetch = require('node-fetch');
const cache = require('./../redis/cache');


export function getMediumArticles() {
  return fetch('https://medium.com/@manoj.wolfpack/latest?format=json', {
    method: 'GET',
  }).then(res => res.text())
    .then(response => JSON.parse(response.substring(response.indexOf('>') + 1)))
    .then(response => {
        cache.put('mediumArticles',response,100000000,  function(key, value) {
            console.log('Cache cleared');
        });
        return response;
    });
}

export function fetchMediumArticles(){
  const cacheResult = cache.get('mediumArticles');
  if(!cacheResult){
    return getMediumArticles();
  }else{
    return Promise.resolve(cacheResult);
  }
}

export function handleMedium(req, res) {
  const cacheResult = cache.get('mediumArticles');
  if(!cacheResult){
    getMediumArticles().then(result =>  {
      res.json(result);
    });
  }else{
    res.json(cacheResult);
  }
}
