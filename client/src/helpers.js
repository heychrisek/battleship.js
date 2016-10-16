import * as R from 'ramda';

const rand5 = function() {
  return Math.floor(Math.random() * 5);
};

const cellOverlaps = function(cellX, cellY, cells) {
  return R.any(R.whereEq({x_pos: cellX, y_pos: cellY}), cells);
};

const getCPUCoords = function(previous) {
  let [x, y] = [rand5(), rand5()];
  return cellOverlaps(x, y, previous) ? getCPUCoords(previous) : [x, y]
};

module.exports = {
  cellOverlaps: cellOverlaps,

  filterByUser: function(user_id, cells) {
    return R.filter(function(cell){ return cell.user_id === user_id }, cells);
  },

  filterHits: function(cells) {
    return R.filter(function(cell){ return cell.hit }, cells);
  },

  getCPUCoords: getCPUCoords
}