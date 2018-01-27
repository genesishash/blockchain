// Generated by IcedCoffeeScript 108.0.11
(function() {
  var Block, GENESIS_BLOCK, blockchain, hash, iced, _, __iced_k, __iced_k_noop,
    __slice = [].slice;

  iced = {
    Deferrals: (function() {
      function _Class(_arg) {
        this.continuation = _arg;
        this.count = 1;
        this.ret = null;
      }

      _Class.prototype._fulfill = function() {
        if (!--this.count) {
          return this.continuation(this.ret);
        }
      };

      _Class.prototype.defer = function(defer_params) {
        ++this.count;
        return (function(_this) {
          return function() {
            var inner_params, _ref;
            inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (defer_params != null) {
              if ((_ref = defer_params.assign_fn) != null) {
                _ref.apply(null, inner_params);
              }
            }
            return _this._fulfill();
          };
        })(this);
      };

      return _Class;

    })(),
    findDeferral: function() {
      return null;
    },
    trampoline: function(_fn) {
      return _fn();
    }
  };
  __iced_k = __iced_k_noop = function() {};

  _ = require('wegweg')({
    globals: true
  });

  hash = require('./hash');

  Block = require('./block');

  blockchain = {
    blocks: [
      GENESIS_BLOCK = new Block({
        index: 0,
        ctime: 1517012327,
        hash: hash.sha256('helo'),
        prev_hash: null,
        data: []
      })
    ]
  };

  blockchain.get_blockchain = (function(cb) {
    return cb(null, this.blocks);
  });

  blockchain.set_blockchain = (function(chain, cb) {
    this.blocks = chain;
    return cb(null, true);
  });

  blockchain.get_last_block = (function(cb) {
    return cb(null, _.last(this.blocks));
  });

  blockchain.is_valid_next_block = (function(block, prev_block, cb) {
    var e, last, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(_this) {
      return (function(__iced_k) {
        if (!prev_block) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "/Users/tky/www/tmp/blockchain/src/lib/blockchain.iced"
            });
            _this.get_last_block(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  e = arguments[0];
                  return last = arguments[1];
                };
              })(),
              lineno: 37
            }));
            __iced_deferrals._fulfill();
          })(function() {
            if (e) {
              return cb(e);
            }
            return __iced_k();
          });
        } else {
          return __iced_k();
        }
      });
    })(this)((function(_this) {
      return function() {
        if (block.index !== (last.index + 1)) {
          log(new Error('Invalid block ID'));
          return cb(null, false);
        }
        if (block.prev_hash !== last.hash) {
          log(new Error('Invalid previous block hash'));
          return cb(null, false);
        }
        if (block.hash !== Block.calculate_hash(block)) {
          log(new Error('Invalid block hash'));
          return cb(null, false);
        }
        return cb(null, true);
      };
    })(this));
  });

  blockchain.is_valid_chain = (function(chain, cb) {
    var block, chain_genesis, e, i, prev_block, valid, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    chain_genesis = chain.shift();
    if (chain_genesis.hash !== GENESIS_BLOCK.hash) {
      log(new Error('Invalid genesis block'));
      return false;
    }
    i = 1;
    (function(_this) {
      return (function(__iced_k) {
        var _i, _len, _ref, _results, _while;
        _ref = chain;
        _len = _ref.length;
        _i = 0;
        _while = function(__iced_k) {
          var _break, _continue, _next;
          _break = __iced_k;
          _continue = function() {
            return iced.trampoline(function() {
              ++_i;
              return _while(__iced_k);
            });
          };
          _next = _continue;
          if (!(_i < _len)) {
            return _break();
          } else {
            block = _ref[_i];
            prev_block = block[i - 1];
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/tky/www/tmp/blockchain/src/lib/blockchain.iced"
              });
              _this.is_valid_next_block(block, prev_block, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    e = arguments[0];
                    return valid = arguments[1];
                  };
                })(),
                lineno: 67
              }));
              __iced_deferrals._fulfill();
            })(function() {
              if (e) {
                return cb(e);
              }
              if (!valid) {
                log(new Error('Invalid block in chain', block.index));
                return false;
              }
              return _next(i += 1);
            });
          }
        };
        _while(__iced_k);
      });
    })(this)((function(_this) {
      return function() {
        return cb(null, true);
      };
    })(this));
  });

  blockchain.replace_chain = (function(new_chain, cb) {
    var cur_chain, e, valid, ___iced_passed_deferral, __iced_deferrals, __iced_k;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    (function(_this) {
      return (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "/Users/tky/www/tmp/blockchain/src/lib/blockchain.iced"
        });
        _this.get_blockchain(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              e = arguments[0];
              return cur_chain = arguments[1];
            };
          })(),
          lineno: 80
        }));
        __iced_deferrals._fulfill();
      });
    })(this)((function(_this) {
      return function() {
        if (e) {
          return cb(e);
        }
        (function(__iced_k) {
          if (new_chain.length > cur_chain.length) {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "/Users/tky/www/tmp/blockchain/src/lib/blockchain.iced"
              });
              _this.is_valid_chain(new_chain, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    e = arguments[0];
                    return valid = arguments[1];
                  };
                })(),
                lineno: 84
              }));
              __iced_deferrals._fulfill();
            })(function() {
              if (e) {
                return cb(e);
              }
              return __iced_k(valid ? log('Received blockchain is valid and longer than existing chain, replacing our chain') : void 0);
            });
          } else {
            return __iced_k();
          }
        })(function() {
          return cb(null, true);
        });
      };
    })(this));
  });

  module.exports = blockchain;

  if (!module.parent) {
    log(/TEST/);
    exit(0);
  }

}).call(this);
