import axios from 'axios';

let apiRoot = 'http://duet-api-docker.9dqvkk3fep.us-east-1.elasticbeanstalk.com';
console.error(process.env.NODE_ENV);
if(process.env.NODE_ENV == 'dev') {
  apiRoot = 'http://localhost:3000';
}
export function getCards() {
  return axios.get(`${apiRoot}/cards/1`);
}
