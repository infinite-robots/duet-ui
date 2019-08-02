import axios from 'axios';

const apiRoot = 'http://duet-api-docker.9dqvkk3fep.us-east-1.elasticbeanstalk.com';

export function getCards() {
  return axios.get(`${apiRoot}/cards`);
}