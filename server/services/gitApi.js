const fetch = require('node-fetch');
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

export function fetchGraphQlData(){
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
      'Authorization': `Bearer ${process.env.gitApiKey}`,
    },
  }).then(res => res.text()).then(res => JSON.parse(res));
}


export function handleGitApi(req, res) {

  return fetchGraphQlData().then(result => {
      res.setHeader("Cache-Control", "public, max-age=2592000");
      res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
      return res.send(result);
    }
  );

}
