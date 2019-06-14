const fetch = require('node-fetch');
const cache = require('./../redis/cache');

const accessToken = process.env.gitApiKey;
const query = `
{
  search(query: "user:manojkumarmuralidharan topic:public-manoj", type: REPOSITORY, first: 30) {
    edges {
      node {
          ... on Repository{
                name
                url
                description
                repositoryTopics(first: 30 ){
                  edges{
                    node {
                      topic {
                        name
                      }
                    }
                  }

                }

              }
            }
          }
        }
}
`;

export const getGraphQlData = () => fetch('https://api.github.com/graphql', {
  method: 'POST',
  body: JSON.stringify({ query }),
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(res => res.text())
  .then(res => JSON.parse(res))
  .then((response) => {
    cache.put('githubRepos', response, 100000000, (key, value) => {
      console.log('Cache cleared - githubRepos');
    });
    return response;
  });

export const fetchGraphQlData = () => {
  const cacheResult = cache.get('githubRepos');
  if (!cacheResult) {
    return getGraphQlData();
  }
  return Promise.resolve(cacheResult);
};


export const handleGitApi = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=2592000');
  res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());

  const cacheResult = cache.get('githubRepos');
  if (!cacheResult) {
    getGraphQlData().then((result) => {
      res.json(result);
    });
  } else {
    res.json(cacheResult);
  }
};
