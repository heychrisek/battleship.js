import * as types from '../actions/action-types';

const initialState = {
  inProgressGame: null,
  allGames: [],
  shipPlacements: [],
  attackPlacements: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.START_GAME:
      console.log("new state", Object.assign({}, state, {inProgressGame: action.id}))
      return Object.assign({}, state, {inProgressGame: action.id});
    case types.SET_PLACEMENT:
      const shipPlacements = [
        ...state.shipPlacements,
        {
          id: action.response.id,
          user_id: action.response.user_id,
          x_pos: action.response.x_pos,
          y_pos: action.response.y_pos,
        }
      ]
      console.log("new state", Object.assign({}, state, {shipPlacements: shipPlacements}))
      return Object.assign({}, state, {shipPlacements: shipPlacements});
    case types.SET_ATTACK:
      const attackPlacements = [
        ...state.attackPlacements,
        {
          id: action.response.id,
          user_id: action.response.user_id,
          x_pos: action.response.x_pos,
          y_pos: action.response.y_pos,
          hit: action.response.hit,
        }
      ]
      console.log("new state", Object.assign({}, state, {attackPlacements: attackPlacements}))
      return Object.assign({}, state, {attackPlacements: attackPlacements});
    default:
      return state;
  }
};