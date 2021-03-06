/* global define */
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    global.modlog = factory()
  }
})(this, function () {
  'use strict'

  var date = require('phpdate')
  var is_node = typeof window === 'undefined'
  var levels = ['error', 'warn', 'info', 'debug', 'silly']
  var color_level

  if (is_node) {
    var chalk = require('chalk')
  }

  var color_map = {
    debug: 'green',
    info: 'blue',
    warn: 'yellow',
    error: 'red'
  }

  if (is_node) {
    color_level = function (level, msg) {
      if (!color_map[level]) {
        return msg
      }
      return chalk[color_map[level]](msg)
    }
  } else {
    color_level = function (level, msg) {
      return msg
    }
  }

  function defaults (obj, source) {
    if (typeof obj === 'undefined') {
      obj = {}
    }
    for (var k in source) {
      if (!obj.hasOwnProperty(k)) {
        obj[k] = source[k]
      }
    }
    return obj
  }

  function do_log () {
    var args = [].slice.call(arguments)
    var _level = args.shift()
    var _module_name = args.shift()

    var preamble = date('[' + this.options.format + ']') + '[' + _module_name + ']'
    if (this.options.colors) {
      preamble = color_level(_level, preamble)
    }
    if (typeof args[0] === 'string') {
      args[0] = preamble + ' ' + args[0]
    } else {
      args.unshift(preamble)
    }
    if (typeof this.options.logger[_level] === 'function') {
      this.options.logger[_level].apply(this.options.logger, args)
    }
  }

  /**
   * get a default thing to log to. this is so we don't mess with the global `console`
   *
   * @return {object}
   */
  function get_default_logger () {
    var _logger = {}
    for (var idx in levels) {
      var _level = levels[idx]
      if (_level === 'silly') {
        _level = 'debug'
      }
      if (is_node && _level === 'debug') {
        // node.js does not actually have console.debug. TIL.
        _level = 'info'
      }
      _logger[_level] = console[_level].bind(console)
    }
    return _logger
  }

  return function modlog_factory (module_name, options) {
    var _log = {}
    _log.options = defaults(options, {
      format: 'H:i:s',
      colors: true
    })
    if (!_log.options.logger) {
      _log.options.logger = get_default_logger()
    }
    for (var idx in levels) {
      _log[levels[idx]] = do_log.bind(_log, levels[idx], module_name)
    }
    return _log
  }
})
