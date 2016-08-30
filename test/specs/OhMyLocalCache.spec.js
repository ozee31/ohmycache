import OhMyCache from 'src/OhMyLocalCache.js'

describe('OhMyLocalCache', () => {
  var _class = new OhMyCache()

  afterEach(function() {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  function time() {
    return Math.floor(Date.now() / 1000)
  }

  describe("getEngine()", function() {
    it('is localStorage', function() {
      expect(_class.getEngine()).toBe(localStorage)
    })

    it('is not sessionStorage', function() {
      expect(_class.getEngine()).not.toBe(sessionStorage)
    })
  })

  describe("set()", function() {
    it('add a new data (string)', function() {
      let key = 'hello'
      let val = 'word'
      let expected = JSON.stringify({0:val, 1:time()})
      let returnFn = _class.set(key, val)

      expect(true).toBe(returnFn)
      expect(expected).toBe(localStorage.getItem(key))
      expect(null).toBe(sessionStorage.getItem(key))
    })

    it('add a new data (array)', function() {
      let key = 'hello'
      let val = [1,2,3]
      let expected = JSON.stringify({0:val, 1:time()})
      let returnFn = _class.set(key, val)

      expect(true).toBe(returnFn)
      expect(expected).toBe(localStorage.getItem(key))
    })

    it('add a new data (object)', function() {
      let key = 'hello'
      let val = {t1:1, t2:2}
      let expected = JSON.stringify({0:val, 1:time()})
      let returnFn = _class.set(key, val)

      expect(true).toBe(returnFn)
      expect(expected).toBe(localStorage.getItem(key))
    })

    it('add a new data with expiration', function() {
      let key = 'hello'
      let val = 'world'
      let expiration = 3600
      let expected = JSON.stringify({0:val, 1:time(), 2:time()+expiration})
      let returnFn = _class.set(key, val, {expire: expiration})

      expect(true).toBe(returnFn)
      expect(expected).toBe(localStorage.getItem(key))
    })

    it('add a new data with expiration (not int) => fail', function() {
      let key = 'hello'
      let val = 'world'
      let expiration = 'notAInt'
      let returnFn = _class.set(key, val, {expire: expiration})

      expect(false).toBe(returnFn)
      expect(null).toBe(localStorage.getItem(key))
    })

    it('add a new data (readOnly)', function() {
      let key = 'hello'
      let val = 'world'
      let expected = JSON.stringify({0:val, 1:time(), 3:true})
      let returnFn = _class.set(key, val, {readonly: true})

      expect(true).toBe(returnFn)
      expect(expected).toBe(localStorage.getItem(key))
    })

    it('update a data', function() {
      let key = 'hello'
      _class.set(key, 'world')
      let val = 'girl'
      let expected = JSON.stringify({0:val, 1:time()})
      let returnFn = _class.set(key, val)

      expect(true).toBe(returnFn)
      expect(expected).toBe(localStorage.getItem(key))
    })

    it('update a data (readOnly)', function() {
      let key = 'hello'
      let created = time()
      let valInsert = 'world'
      _class.set(key, valInsert, {readonly: true})
      let valUpdate = 'girl'
      let expected = JSON.stringify({0:valInsert, 1:created, 3:true})
      let returnFn = _class.set(key, valUpdate)

      expect(false).toBe(returnFn)
      expect(expected).toBe(localStorage.getItem(key))
    })
  })



  describe("getItem()", function() {
    it('get a string', function() {
      let key = 'hello'
      let val = 'world'

      _class.set(key, val)

      let expected = {
        0: val,
        1: time(),
      }
      let result = _class.getItem(key)

      expect(expected).toEqual(result)
    })

    it('get an array', function() {
      let key = 'hello'
      let val = [1,2,3]

      _class.set(key, val)

      let expected = {
        0: val,
        1: time(),
      }
      let result = _class.getItem(key)

      expect(expected).toEqual(result)
    })

    it('get an object', function() {
      let key = 'hello'
      let val = {t1:1, t2:2}

      _class.set(key, val)

      let expected = {
        0: val,
        1: time(),
      }
      let result = _class.getItem(key)

      expect(expected).toEqual(result)
    })

    it('get undefided', function() {
      expect(null).toBe(_class.getItem('blablablabla'))
    })

    it('get not set with cachejs', function() {
      let key = 'nocachejs'
      let val = 'oh no !!!'

      localStorage.setItem(key, val)

      let expected = {
        0: val
      }
      let result = _class.getItem(key)

      expect(expected).toEqual(result)
    })

    it('get a data no expired', function() {
      let key        = 'hello'
      let val        = 'world'
      let expiration = 3600

      _class.set(key, val, {expire: expiration})

      let expected = {0:val, 1:time(), 2:time()+expiration}
      let result   = _class.getItem(key)

      expect(expected).toEqual(result)
    })

    it('get a data expired', function() {
      let key = 'hello'
      let val = 'world'
      let created = 1451602800 // 2016-01-01
      let expired = created + 3600

      localStorage.setItem(key, JSON.stringify({0:val, 1:created, 2:expired}))

      let result = _class.getItem(key)

      expect(null).toBe(result)
      expect(null).toBe(localStorage.getItem(key))
    })

    it('get a data (readOnly)', function() {
      let key = 'hello'
      let val = 'world'

      _class.set(key, val, {readonly: true})

      let expected = {0:val, 1:time(), 3:true}
      let result = _class.getItem(key)

      expect(expected).toEqual(result)
    })
  })



  describe("get()", function() {
    it('get a string', function() {
      let key = 'hello'
      let val = 'world'
      _class.set(key, val)

      expect(val).toEqual(_class.get(key))
    })

    it('get an array', function() {
      let key = 'hello'
      let val = [1,2,3]
      _class.set(key, val)

      expect(val).toEqual(_class.get(key))
    })

    it('get an object', function() {
      let key = 'hello'
      let val = {t1:1, t2:2}
      _class.set(key, val)

      expect(val).toEqual(_class.get(key))
    })

    it('get undefided', function() {
      expect(null).toBe(_class.get('blablablabla'))
    })

    it('get not set with cachejs', function() {
      let key = 'nocachejs'
      let val = 'oh no !!!'
      localStorage.setItem(key, val)

      expect(val).toEqual(_class.get(key))
    })

    it('get a data no expired', function() {
      let key        = 'hello'
      let val        = 'world'
      let expiration = 3600
      _class.set(key, val, {expire: expiration})

      expect(val).toEqual(_class.get(key))
    })

    it('get a data expired', function() {
      let key = 'hello'
      let val = 'world'
      let created = 1451602800 // 2016-01-01
      let expired = created + 3600
      localStorage.setItem(key, JSON.stringify({0:val, 1:created, 2:expired}))

      expect(null).toBe(_class.get(key))
      expect(null).toBe(localStorage.getItem(key))
    })

    it('get a data (readOnly)', function() {
      let key = 'hello'
      let val = 'world'
      _class.set(key, val, {readonly: true})

      expect(val).toEqual(_class.get(key))
    })
  })



  describe("getAll()", function() {
    it('return all items key', function() {
      _class.set('key1', 'val1')
      _class.set('key2', 'val2')

      let expected = {key2: 'val2', key1: 'val1'}
      let result = _class.getAll()

      expect(expected).toEqual(result)
    })
  })



  describe("keys()", function() {
    it('return all items key', function() {
      _class.set('key1', 'val1')
      _class.set('key2', 'val2')

      let expected = ['key2', 'key1']
      let result = _class.keys()

      expect(expected).toEqual(result)
    })
  })



  describe("remove()", function() {
    it('remove', function() {
      let key = 'hello'
      let val = 'world'
      _class.set(key, val)

      expect(null).not.toBe(localStorage.getItem(key))
      expect(true).toBe(_class.remove(key))
      expect(null).toBe(localStorage.getItem(key))
      expect(null).toBe(_class.get(key))
    })

    it('remove not exist', function() {
      expect(true).toBe(_class.remove('Piiiikaaaachuuuuuuuuuu !!!!!'))
    })

    it('not remove if readonly', function() {
      let key = 'hello'
      let val = 'world'
      _class.set(key, val, {readonly: true})

      expect(null).not.toBe(localStorage.getItem(key))
      expect(false).toBe(_class.remove(key))
      expect(null).not.toBe(localStorage.getItem(key))
      expect(null).not.toBe(_class.get(key))
    })
  })



  describe("isExpired()", function() {
    it('is expired', function() {
      let key = 'hello'
      let val = 'world'
      let created = 1451602800 // 2016-01-01
      let expired = created + 3600
      localStorage.setItem(key, JSON.stringify({0:val, 1:created, 2:expired}))

      expect(true).toBe(_class.isExpired(key))
    })

    it('not expired', function() {
      let key        = 'hello'
      let val        = 'world'
      let expiration = 3600
      _class.set(key, val, {expire: expiration})

      expect(false).toBe(_class.isExpired(key))
    })

    it('not exist', function() {
      expect(null).toBe(_class.isExpired('tictac'))
    })

    it('not have expiration', function() {
      let key = 'hello'
      let val = 'world'
      _class.set(key, val)

      expect(false).toBe(_class.isExpired(key))
    })
  })



  describe("isReadonly()", function() {
    it('is readonly', function() {
      let key = 'hello'
      let val = 'world'
      _class.set(key, val, {readonly: true})

      expect(true).toBe(_class.isReadonly(key))
    })

    it('not readonly', function() {
      let key = 'hello'
      let val = 'world'
      _class.set(key, val)

      expect(false).toBe(_class.isReadonly(key))
    })

    it('not exist', function() {
      expect(null).toBe(_class.isReadonly('tictac'))
    })
  })



  describe("clear()", function() {
    it('clear', function() {
      _class.set('k1', 'v1', {readonly: true})
      _class.set('k2', 'v2')
      sessionStorage.setItem('s1', 's2')

      _class.clear();

      expect(null).toBe(localStorage.getItem('k1'))
      expect(null).toBe(localStorage.getItem('k2'))
      expect(null).toBe(_class.get('k1'))
      expect(null).toBe(_class.get('k2'))
      expect('s2').toEqual(sessionStorage.getItem('s1'))
    });
  });
})