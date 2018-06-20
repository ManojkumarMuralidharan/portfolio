const fetch = require('node-fetch');

//const accessToken = 'd299b8218ac85783e61610155ca567e2f6433944';
const accessToken = process.env.gitApiKey;
console.log('accessToken',process.env.gitApiKey);
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



export function handleGitApi(req, res) {

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
      'Authorization': `Bearer ${process.env.gitApiKey}`,
    },
  }).then(res => res.text())
  .then(result =>  res.send(result));

}
