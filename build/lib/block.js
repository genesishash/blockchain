// Generated by IcedCoffeeScript 108.0.11
(function() {
  var Block, Schema, b, b2, calculate_hash, hash, is_valid_proof, mongoose, _;

  _ = require('wegweg')({
    globals: true
  });

  mongoose = require('mongoose');

  hash = require('./hash');

  Schema = new mongoose.Schema({
    index: Number,
    ctime: Number,
    hash: String,
    prev: String,
    difficulty: {
      type: Number,
      "default": env.DIFFICULTY_LEVEL_START
    },
    proof: {
      type: Number,
      "default": 0
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      "default": null
    }
  }, {
    _id: false
  });

  Schema.statics.is_valid_schema = (function(block_obj) {
    var k, key, props, v, _i, _len, _ref;
    props = {
      index: 'number',
      ctime: 'number',
      hash: 'string',
      prev: 'string',
      difficulty: 'number',
      proof: 'number',
      data: 'object'
    };
    if (block_obj.index === 0 && block_obj.hash === hash.auto(env.GENESIS_HASH_STRING)) {
      _ref = ['prev', 'data'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        delete props[key];
      }
    }
    for (k in props) {
      v = props[k];
      if (block_obj[k] == null) {
        return false;
      }
      if (v) {
        if (typeof block_obj[k] !== v) {
          return false;
        }
      }
    }
    return true;
  });

  Schema.statics.is_valid_proof = is_valid_proof = (function(block_obj) {
    var binary, str, x, _i, _ref;
    str = '';
    for (x = _i = 1, _ref = block_obj.difficulty; 1 <= _ref ? _i <= _ref : _i >= _ref; x = 1 <= _ref ? ++_i : --_i) {
      str += '0';
    }
    binary = hash._hex_to_binary(block_obj.hash);
    if (binary.startsWith(str)) {
      return true;
    }
    return false;
  });

  Schema.statics.calculate_hash = calculate_hash = (function(block_obj) {
    var arr, _ref, _ref1;
    arr = [block_obj.index, block_obj.ctime, (_ref = block_obj.prev) != null ? _ref : null, block_obj.difficulty, block_obj.proof, JSON.stringify((_ref1 = block_obj.data) != null ? _ref1 : {})];
    return hash.sha256(arr.join(''));
  });

  module.exports = Block = mongoose.model('Block', Schema);

  if (!module.parent) {
    log(/TEST/);
    b = new Block({
      index: 3,
      ctime: 1517012327,
      hash: hash.sha256('helo'),
      prev: 'abc',
      data: []
    });
    log(/valid block/, b);
    log(/is_valid_structure/, b.is_valid_structure());
    b2 = new Block({
      index: 'a'
    });
    log(/invalid block/, b2);
    log(/is_valid_structure/, b.is_valid_structure());
    exit(0);
  }

}).call(this);
