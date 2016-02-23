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

  var levels = ['error', 'warn', 'info', 'debug', 'silly']

  function get_global_arg (arg, _default) {
    if (typeof window === 'object' && window.hasOwnProperty(arg)) {
      return window[arg]
    }
    if (typeof process === 'object' && process.env.hasOwnProperty(arg)) {
      return process.env[arg]
    }
    return _default
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

  function pad (num, size) {
    var s = num + ''
    while (s.length < size) s = '0' + s
    return s
  }

  function do_log () {
    var args = [].slice.call(arguments)
    var _level = args.shift()
    var _module_name = args.shift()

    if (levels.indexOf(_level) <= get_global_arg('MODLOG_LEVEL', 1)) {
      var now = new Date()
      var ts = '[' + pad(now.getHours(), 2) + ':' + pad(now.getMinutes(), 2) + ':' + pad(now.getSeconds(), 2) + ']'
      if (typeof args[0] === 'string') {
        args[0] = ts + '[' + _module_name + '] ' + args[0]
      } else {
        args.unshift(ts + '[' + _module_name + '] ')
      }
      if (_level === 'silly') {
        _level = 'debug'
      }
      if (typeof this.options.logger[_level] === 'function') {
        this.options.logger[_level].apply(this.options.logger, args)
      }
    }
  }

  return function modlog_factory (module_name, options) {
    var _log = {}
    _log.options = defaults(options, {
      logger: console
    })
    for (var idx in levels) {
      _log[levels[idx]] = do_log.bind(_log, levels[idx], module_name)
    }
    return _log
  }
})
