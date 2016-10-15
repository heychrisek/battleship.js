import * as types from './action-types';
import fetch from 'isomorphic-fetch'

export const startGame = (id) => {
  return {
    type: types.START_GAME,
    id
  };
}

export const initiateGame = () => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/games/new`, {method: 'POST'})
      .then(function(response) {
        return response.json()
      })
      .then(function({id}) {
        dispatch(startGame(id))
      })
  }
}

export const setPlacement = (response) => {
  return {
    type: types.SET_PLACEMENT,
    response
  }
}

export const initiatePlacement = (gameId, x_pos, y_pos) => {
  const params = {game_id: gameId, x_pos, y_pos, user_id: 1}
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return dispatch => {
    return fetch(`http://localhost:4000/api/games/${gameId}/placement`, {method: 'POST', body: JSON.stringify(params), headers})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        dispatch(setPlacement(response))
      })
  }
}