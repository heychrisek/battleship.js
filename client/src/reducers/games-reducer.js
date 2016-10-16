import * as types from '../actions/action-types';
import * as R from 'ramda';

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
      const allGames = [...state.allGames, action.game]
      return Object.assign({}, state, {inProgressGame: action.game.id, shipPlacements: [], attackPlacements: [], allGames});
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
    case types.REMOVE_GAME:
      const games = R.reject(R.propEq('id', Number(action.id)), state.allGames)
      return Object.assign({}, state, {allGames: games});
    case types.LOAD_GAME:
      const {game, placements, moves} = action.data
      return Object.assign({}, state, {inProgressGame: game.id, shipPlacements: placements, attackPlacements: moves});
    default:
      return state;
  }
};