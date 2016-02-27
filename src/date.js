'use strict'

var ESCAPE_CHAR = '\\'

function pad (num, size) {
  var s = num + ''
  while (s.length < size) s = '0' + s
  return s
}

var short_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
var long_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var iso_8601_numeric_day = ['7', '1', '2', '3', '4', '5', '6']

var long_months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']
var short_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']

var tokens = {
  d: function (date) {
    return pad(date.getDate(), 2)
  },
  j: function (date) {
    return String(date.getDate())
  },
  D: function (date) {
    return short_days[date.getDay()]
  },
  l: function (date) {
    return long_days[date.getDay()]
  },
  N: function (date) {
    return iso_8601_numeric_day[date.getDay()]
  },
  S: function (date) {
    if ([1, 21, 31].indexOf(date.getDate()) !== -1) {
      return 'st'
    }
    if ([2, 22].indexOf(date.getDate()) !== -1) {
      return 'nd'
    }
    if ([3, 23].indexOf(date.getDate()) !== -1) {
      return 'rd'
    }
    return 'th'
  },
  w: function (date) {
    return String(date.getDay())
  },
  z: function (date) {
    var start = new Date(date.getFullYear(), 0, 1)
    return Math.floor((date - start) / (1000 * 60 * 60 * 24))
  },
  F: function (date) {
    return long_months[date.getMonth()]
  },
  m: function (date) {
    return pad(date.getMonth() + 1, 2)
  },
  M: function (date) {
    return short_months[date.getMonth()]
  },
  n: function (date) {
    return String(date.getMonth() + 1)
  },
  L: function (date) {
    var year = date.getFullYear()
    if (((year % 4) === 0 && (year % 100) !== 0) || (year % 400) === 0) {
      return '1'
    }
    return '0'
  },
  t: function (date) {
    if (date.getMonth() === 1) {
      return this.L(date) === '1' ? '29' : '28'
    }
    if ([0, 2, 4, 6, 7, 9, 11].indexOf(date.getMonth())) {
      return '31'
    }
    return '30'
  },
  Y: function (date) {
    return String(date.getFullYear())
  },
  y: function (date) {
    return String(date.getFullYear()).slice(2)
  },
  a: function (date) {
    return date.getHours() < 12 ? 'am' : 'pm'
  },
  A: function (date) {
    return this.a(date).toUpperCase()
  },
  g: function (date) {
    return String(date.getHours() % 12 || 12)
  },
  G: function (date) {
    return String(date.getHours())
  },
  h: function (date) {
    return pad(this.g(date), 2)
  },
  H: function (date) {
    return pad(this.G(date), 2)
  },
  i: function (date) {
    return pad(date.getMinutes(), 2)
  },
  s: function (date) {
    return pad(date.getSeconds(), 2)
  },
  u: function (date) {
    return String(date.getTime()).slice(-3)
  }
}

module.exports = function date (format, time) {
  var specimen, idx, char, replacement, head, tail
  if (!time) {
    time = new Date()
  }
  specimen = format.split('')
  for (idx = 0; idx < specimen.length; idx++) {
    if (idx > 0 && specimen[Math.max(0, idx - 1)] === ESCAPE_CHAR) {
      head = specimen.slice(0, idx - 1)
      tail = specimen.slice(idx)
      specimen = head.concat(tail)
      continue
    }
    char = specimen[idx]
    if (!tokens[char]) {
      continue
    }
    replacement = tokens[char](time).split('')
    head = specimen.slice(0, idx)
    tail = specimen.slice(idx + 1)
    specimen = head.concat(replacement, tail)
    idx += (replacement.length - 1)
  }
  return specimen.join('')
}
