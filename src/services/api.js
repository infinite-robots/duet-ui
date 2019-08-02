import axios from 'axios';

const apiRoot = 'http://duet-api-docker.9dqvkk3fep.us-east-1.elasticbeanstalk.com';

export function getCards() {
  return axios.get(`${apiRoot}/cards/1`);
}

/*
 * cardId = bandId or personId
 * type = 'person' or 'band'
 */
export function swipeCard(type, genre, userId, cardId, swipe) {
  return axios.post(`${apiRoot}/cards/swipe`, {
    type,
    genre,
    userId,
    cardId,
    swipe: swipe ? 'right' : 'left'
  });
}