const routington = require('routington')
const symbol = require('es6-symbol')
const assert = require('assert')

const sym = symbol('wayfarer')

module.exports = wayfarer

// create a router
// str -> obj
function wayfarer (dft) {
  dft = sanitizeUri(dft) || ''
  const router = routington()
  const mounts = {}

  emit[sym] = true
  emit.emit = emit
  emit.on = on

  return emit

  // define a path
  // str, fn -> obj
  function on (path, cb) {
    assert.equal(typeof path, 'string')
    assert.equal(typeof cb, 'function')
    path = sanitizeUri(path) || ''

    if (cb[sym]) return mount(path, cb)

    const node = router.define(path)[0]
    node.cb = cb
    return emit
  }

  // match a route
  // str -> null
  function emit (path) {
    path = sanitizeUri(path) || ''

    const mountPath = mountMatch(path)
    if (mountPath) {
      const nw = path.split('/')
      nw.shift()
      return mount(nw.join())
    }

    const match = router.match(path) || router.match(dft)
    // console.log('node', path, match)
    match.node.cb('/' + path, match ? match.param : {})
  }

  // mount a subrouter
  // str -> null
  function mount (path, cb) {
    path = path.split('/')[0]
    mounts[path] = cb
    return emit
  }

  // match a mounted router
  // str -> str|bool
  function mountMatch (path) {
    const nw = path.split('/')[0]
    const match = mounts[path.split('/')[0]]
    return match ? nw : false
  }
}

// strip leading `/`
// str -> str
function sanitizeUri (str) {
  str = str || ''
  return str.replace(/^\//, '')
}
