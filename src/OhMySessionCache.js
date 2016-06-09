import OhMyCache from './OhMyCache.js'

export default class OhMySessionCache extends OhMyCache {

  constructor () {
    super(window.sessionStorage)
  }
}
