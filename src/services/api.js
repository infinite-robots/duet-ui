import axios from 'axios';
import { getUser } from './auth';

let apiRoot = 'https://love.duet-api.com';

if(process.env.NODE_ENV == 'dev') {
    apiRoot = 'http://localhost:3000';
}

export function getCards() {
  const user = getUser();
  return axios.get(`${apiRoot}/cards/${user.id}`);
}


export function createUser(user) {
  return axios.post(`${apiRoot}/users`, user);
}
/*
 * cardId = bandId or personId
 * type = 'person' or 'band'
 */
export function swipeCard(type, genre, userId, cardId, swipe) {
  const user = getUser();
  return axios.post(`${apiRoot}/cards/swipe`, {
    type,
    genre,
    userId: user.id,
    cardId,
    swipe: swipe ? 'right' : 'left'
  });
}

export function longPoll() {
  const user = getUser();
  return axios.get(`${apiRoot}/interest-and-chats/${user.id}`);
}
