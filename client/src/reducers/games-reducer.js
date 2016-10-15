import * as types from '../actions/action-types';

const initialState = {
  inProgressGame: null,
  allGames: [],
  shipPlacements: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.START_GAME:
      return Object.assign({}, state, {inProgressGame: action.id});
    case types.SET_PLACEMENT:
      const shipPlacements = [
        ...state.shipPlacements,
        {
          id: action.response.placement_id.id,
          x_pos: action.response.x_pos,
          y_pos: action.response.y_pos,
        }
      ]
      return Object.assign({}, state, {shipPlacements: shipPlacements});
    default:
      return state;
  }
};