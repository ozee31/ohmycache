export default class OhMyCache {

  constructor (engine) {
    this.engine = engine
  }

  /**
   * Return the current storage object
   * @return {object}
   */
  getEngine () {
    return this.engine
  }

  /**
   * Get complete item by key with value, date, expiration and readonly options, remove if expired
   * @param  {string} key
   * @return {object} or null
   */
  getItem (key) {
    let item = _get(this.engine, key)

    if (_isExpired(item)) {
      _remove(this.engine, key)
      return null
    }

    return item
  }

  /**
   * Get the value, remove if expired
   * @param  {string} key
   * @return {mixed} string, array, object...
   */
  get (key) {
    let item = this.getItem(key)
    return (item) ? item[VALUE] : null
  }

  /**
   * Add the key to the storage, or update that key's value if it already exists
   * @param {string} key
   * @param {mixed} value : value you want to give the key you are creating/updating (string, int, array, object...)
   * @param {Object} options : {
        expire : (int) the item expires in x seconds // default = false
        readOnly : (true) prohibit modification // default = false
   * }
   */
  set (key, value, options = {}) {
    let itemCached = this.getItem(key)
    let item = {}
    let now = _time()

    if (itemCached && _isReadonly(itemCached)) {
      return false
    }

    item[VALUE] = value
    item[CREATED] = now

    if (options.expire) {
      let expire = parseInt(options.expire, 10)

      if (!expire) {
        return false
      }

      item[EXPIRATION] = now + expire
    }

    if (options.readonly) {
      item[READ_ONLY] = true
    }

    item = JSON.stringify(item)

    try {
      this.engine.setItem(key, item)
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Remove item if don't readonly
   * @param  {string} key
   * @return {boolean}
   */
  remove (key) {
    let itemCached = this.getItem(key)

    if (itemCached && _isReadonly(itemCached)) {
      return false
    }

    return _remove(this.engine, key)
  }

  /**
   * Remove all items
   * @return {boolean}
   */
  clear () {
    try {
      this.engine.clear()
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * indicates whether the value has expired
   * @param  {string} key
   * @return {Boolean} or {null} if doesn't exist
   */
  isExpired (key) {
    return _isExpired(_get(this.engine, key))
  }

  /**
   * indicates whether the value is readonly
   * @param  {string} key
   * @return {Boolean} or {null} if doesn't exist
   */
  isReadonly (key) {
    return _isReadonly(_get(this.engine, key))
  }
}

/**
 ****
 * ~~~~ CONST ~~~~
 ****
 */
const VALUE = 0
const CREATED = 1
const EXPIRATION = 2
const READ_ONLY = 3

/**
 ****
 * ~~~~ PRIVATE FUNCTIONS ~~~~
 ****
 */

/**
 * Get current timestamp in second
 * @return {int}
 */
function _time () {
  return Math.floor(Date.now() / 1000)
}

/**
 * Get complete item by key with value, date, expiration and readonly options
 * @param  {object} engine : object engine
 * @param  {string} key
 * @return {object} or null
 */
function _get (engine, key) {
  try {
    let data = engine.getItem(key)

    if (!data) {
      return null
    }

    try {
      return JSON.parse(data)
    } catch (e) {
      let _data = {}
      _data[VALUE] = data

      return _data
    }
  } catch (e) {
    return null
  }
}

/**
 * Indicates if the item expired
 * @param  {object}  item
 * @return {Boolean}
 */
function _isExpired (item) {
  if (!item) {
    return null
  }

  return _time() > item[EXPIRATION]
}

function _isReadonly (item) {
  if (!item) {
    return null
  }

  return item[READ_ONLY] === true
}

/**
 * Remove item
 * @param  {object} engine
 * @param  {string} key
 * @return {bool}
 */
function _remove (engine, key) {
  try {
    engine.removeItem(key)
    return true
  } catch (e) {
    return false
  }
}
