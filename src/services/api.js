import axios from 'axios';

let apiRoot = 'https://love.duet-api.com';

if(process.env.NODE_ENV == 'dev') {
    apiRoot = 'http://localhost:3000';
}

export function getCards() {
  return axios.get(`${apiRoot}/cards/1`);
}


export function createUser(user) {
  return axios.post(`${apiRoot}/users`, user);
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

export function longPoll() {
  return axios.get(`${apiRoot}/interest-and-chats/1`);
}
