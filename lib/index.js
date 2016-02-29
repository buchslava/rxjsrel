'use strict';

const Rx = require('rxjs');

const filterByKeys = (r, options) =>
(!options.keys || !options.keys.left || !options.keys.right) ||
r[0][options.keys.left] === r[1][options.keys.right];

const checkAndGetOperand = op => {
  let result;

  if (op && op instanceof Rx.Observable) {
    result = op;
  }

  if (op && Object.prototype.toString.call(op) === '[object Array]') {
    result = Rx.Observable.from(op);
  }

  if (!result) {
    throw new Error(`Wrong type of operand '${typeof op}'`);
  }

  return result;
};

class Relations {

  constructor(left, right, options) {
    this.left = checkAndGetOperand(left);
    this.right = checkAndGetOperand(right);
    this.options = options || {};
  }

  join(options) {
    const _options = Object.assign({}, options || {}, this.options);
    let _left = this.left;
    let _right = this.right;

    if (_options.conditions) {
      if (_options.conditions.left) {
        _left = _left.filter(rec => _options.conditions.left(rec));
      }

      if (_options.conditions.right) {
        _right = _right.filter(rec => _options.conditions.right(rec));
      }
    }

    return _left
      .concatMap(x => _right.map(y => [x, y]))
      .filter(r => filterByKeys(r, _options))
      .map(r => (_options.transform || (x => x))(r))
      .filter(r => (_options.condition || (() => true))(r));
  }

  static getDefaultTransformer() {
    return rec => Object.assign({}, rec[0], rec[1]);
  }
}

exports.Relations = Relations;
