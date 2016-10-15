import games from './games-reducer.js';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  games
});

export default rootReducer;