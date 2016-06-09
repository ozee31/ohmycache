import OhMyCache from './OhMyCache.js'

export default class OhMyLocalCache extends OhMyCache {

  constructor () {
    super(window.localStorage)
  }
}
