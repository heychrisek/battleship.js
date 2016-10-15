import * as types from './action-types';
import fetch from 'isomorphic-fetch'

const rand5 = function() {
  return Math.floor(Math.random() * 5)
}

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

export const initiatePlacement = (game_id, x_pos, y_pos, user_id) => {
  const params = {game_id, x_pos, y_pos, user_id}
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return dispatch => {
    return fetch(`http://localhost:4000/api/games/${game_id}/placement`, {method: 'POST', body: JSON.stringify(params), headers})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        dispatch(setPlacement(response))
      })
  }
}

export const handlePlacement = (gameId, x_pos, y_pos) => {
  return dispatch => {
    Promise.all([
      dispatch(initiatePlacement(gameId, x_pos, y_pos, 2)),
      dispatch(initiatePlacement(gameId, rand5(), rand5(), 1))
    ])
    .then(function() {
      console.log("here we are")
    })
  }
}

export const setAttack = (response) => {
  return {
    type: types.SET_ATTACK,
    response
  }
}

export const initiateAttack = (gameId, x_pos, y_pos) => {
  const params = {game_id: gameId, x_pos, y_pos, user_id: 2}
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return dispatch => {
    return fetch(`http://localhost:4000/api/games/${gameId}/moves`, {method: 'POST', body: JSON.stringify(params), headers})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        dispatch(setAttack(response))
      })
  }
}