import * as types from '../actions/action-types';

const initialState = {
  inProgressGame: null,
  allGames: [],
  shipPlacements: [],
  attackPlacements: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GAMES:
      return Object.assign({}, state, {allGames: action.games});
    case types.START_GAME:
      return Object.assign({}, state, {inProgressGame: action.id, shipPlacements: [], attackPlacements: []});
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
      return Object.assign({}, state, {attackPlacements: attackPlacements});
    default:
      return state;
  }
};