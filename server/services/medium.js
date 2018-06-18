const fetch = require('node-fetch');

//const accessToken = 'd299b8218ac85783e61610155ca567e2f6433944';
// const accessToken = process.env.gitApiKey;
// console.log('accessToken',process.env.gitApiKey);
// const query = `
// {
//   search(query: "user:manojkumarmuralidharan topic:public-manoj", type: REPOSITORY, first: 30) {
//     edges {
//       node {
//           ... on Repository{
//                 name
//                 repositoryTopics(first: 30 ){
//                   edges{
//                     node {
//                       topic {
//                         name
//                       }
//                     }
//                   }
//
//                 }
//
//               }
//             }
//           }
//         }
//       }
// `;



export function handleMedium(req, res) {

  return fetch('https://medium.com/@manoj.wolfpack/latest?format=json', {
    method: 'GET',
  }).then(res => res.text())
  .then(result =>  {
    const responseJson = JSON.parse(result.substring(result.indexOf('>') + 1));
    res.json(responseJson);
  });

}
