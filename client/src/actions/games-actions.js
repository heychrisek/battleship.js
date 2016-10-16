import * as types from './action-types';
import fetch from 'isomorphic-fetch';
import {cellOverlaps, filterByUser, getCPUCoords} from '../helpers';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export const startGame = (id) => {
  return {
    type: types.START_GAME,
    id
  };
};

export const initiateGame = () => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/games/new`, {method: 'POST'})
      .then(function(response) {
        return response.json()
      })
      .then(function({id}) {
        dispatch(startGame(id))
      });
  };
};

export const setPlacement = (response) => {
  return {
    type: types.SET_PLACEMENT,
    response
  }
}

export const initiatePlacement = (game_id, x_pos, y_pos, user_id) => {
  const params = {game_id, x_pos, y_pos, user_id};
  return dispatch => {
    return fetch(`http://localhost:4000/api/games/${game_id}/placement`, {method: 'POST', body: JSON.stringify(params), headers})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        dispatch(setPlacement(response))
      });
  };
};

export const handlePlacement = (gameId, x_pos, y_pos) => {
  return (dispatch, getState) => {
    const existingPlacements = getState().games.shipPlacements;
    const existingUserPlacements = filterByUser(2, existingPlacements);
    const isDuplicate = cellOverlaps(x_pos, y_pos, existingUserPlacements);
    if (!isDuplicate) {
      const existingCPUPlacements = filterByUser(1, existingPlacements);
      const cpuCoords = getCPUCoords(existingCPUPlacements);
      Promise.all([
        dispatch(initiatePlacement(gameId, x_pos, y_pos, 2)),
        dispatch(initiatePlacement(gameId, cpuCoords[0], cpuCoords[1], 1))
      ]);
    };
  };
};

export const setAttack = (response) => {
  return {
    type: types.SET_ATTACK,
    response
  };
};

export const initiateAttack = (gameId, x_pos, y_pos, user_id) => {
  const params = {game_id: gameId, x_pos, y_pos, user_id};
  return dispatch => {
    return fetch(`http://localhost:4000/api/games/${gameId}/moves`, {method: 'POST', body: JSON.stringify(params), headers})
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        dispatch(setAttack(response))
      });
  };
};

export const handleAttack = (gameId, x_pos, y_pos) => {
  return (dispatch, getState) => {
    const existingAttacks = getState().games.attackPlacements;
    const existingUserAttacks = filterByUser(2, existingAttacks);
    const isDuplicate = cellOverlaps(x_pos, y_pos, existingUserAttacks);
    if (!isDuplicate) {
      const existingCPUAttacks = filterByUser(1, existingAttacks);
      const cpuCoords = getCPUCoords(existingCPUAttacks);
      Promise.all([
        dispatch(initiateAttack(gameId, x_pos, y_pos, 2)),
        dispatch(initiateAttack(gameId, cpuCoords[0], cpuCoords[1], 1))
      ]);
    };
  };
};