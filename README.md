# OhMyCache
OhMyCache is a javascript library that uses LocalStorage and SessionStorage for cache datas on your application without dependencies

## Requirements
Web browser with LocalStorage and SessionStorage :
- Chrome 5+
- Firefox 3.5+
- IE 8+
- Safari 4+
- Opera 10.50+
- Safari Mobile iOS 3.2
- Android 2.1+

## Installation

### With npm
```bash
npm install OhMyCache
```

### With bower
```bash
bower install OhMyCache
```

### Other method
Download this repository and copy files on your project **(not recommended)**

## Load the lib

### ES2015 (babel)
```JS
import {Local, Session} from 'OhMyCache'

// quick use
Local.set('key', 'val')
Session.set('key', 'val')

```

### With require function of node
```JS
var OhMyCache = require('OhMyCache')

// quick use
OhMyCache.Local.set('key', 'val')
OhMyCache.Session.set('key', 'val')
```

### In html
```html
<html>
	<head>
        <!-- npm -->
        <script src="node_modules/ohmycache/dist/bundle.js"></script>

        <!-- bower -->
        <script src="bower_components//ohmycache/dist/bundle.js"></script>

        <!-- other method -->
		<script src="lib-path/ohmycache/dist/bundle.js"></script>
	</head>
</html>
```

## Quick Start

Store data in local storage
```JS
OhMyCache.Local.set('key', 'local')
```

Store data in session storage
```JS
OhMyCache.Session.set('key', 'session')
```

Get data in local storage
```JS
OhMyCache.Local.get('key') // return 'local'
```

Get data in session storage
```JS
OhMyCache.Session.get('key') // return 'session'
```

## Classes

### OhMyCache.Local (use localStorage)
The localStorage property allows you to access a local Storage object. localStorage is similar to sessionStorage. The only difference is that, while data stored in localStorage has no expiration time, data stored in sessionStorage gets cleared when the browsing session ends—that is, when the browser is closed.

### OhMyCache.Session (use sessionStorage)
The sessionStorage property allows you to access a session Storage object. sessionStorage is similar to Window.localStorage, the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends. A page session lasts for as long as the browser is open and survives over page reloads and restores. Opening a page in a new tab or window will cause a new session to be initiated, which differs from how session cookies work.

## Methods
`OhMyCache.Local` and `OhMyCache.Session` share the same API, have access to the same functions.

### Set
Add the key to the storage, or update that key's value if it already exists
`set(key, value, options)`

#### Parameters
- {string} **key**      : name of the key you want to create/updat
- {mixed} **value**     : value you want to give the key you are creating/updating (string, int, array, object...)

#### Options
- {mixed} **expire**    : (int) the item expires in x seconds // default = false
- {mixed} **readonly**  : (true) prohibit modification // default = false

#### Return
**Boolean** : (true) success || (false) fail

#### Exemples
```JS
// String
OhMyCache.Local.set('key', 'value')

// Array
OhMyCache.Local.set('key', [1,2,3])

// Object
OhMyCache.Local.set('key', {fistname: 'James', lastname: 'Bond'})

// With expiration
OhMyCache.Local.set('key', 'value', {expire: 3600}) // data expires in 1 hour

// ReadOnly
OhMyCache.Local.set('key', 'value', {readonly: true}) // return true
OhMyCache.Local.set('key', 'change') // return false
OhMyCache.Local.get('key') // return 'value'
```

### Get
Get the value, remove if expired
`get(key)`

#### Parameters
- {string} **key**

#### Return
**Mixed** : the value OR null if the data has expired or not exist

#### Exemples
```JS
OhMyCache.Local.set('key', 'value')

OhMyCache.Local.get('key') // 'value'
OhMyCache.Session.get('key') // null

OhMyCache.Local.set('key', 'value', {expire: 1})
// sleep 2 secondes or more
OhMyCache.Local.get('key') // null
```

### Remove
Remove item if don't readonly
`remove(key)`

#### Parameters
- {string} **key**

#### Return
**Boolean** :  (true) success || (false) fail

#### Exemples
```JS
OhMyCache.Local.set('key', 'value')
OhMyCache.Local.get('key') // 'value'
OhMyCache.Local.remove('key') // true
OhMyCache.Local.get('key') // null

// ReadOnly
OhMyCache.Local.set('key', 'value', {readonly: true})
OhMyCache.Local.get('key') // 'value'
OhMyCache.Local.remove('key') // false
OhMyCache.Local.get('key') // 'value'
```

### Clear
Remove all items
`clear()`

#### Return
true

#### Exemples
```JS
OhMyCache.Local.set('key', 'value')
OhMyCache.Local.set('key2', 'value', {readonly: true})

OhMyCache.Local.clear() // true

OhMyCache.Local.get('key') // null
OhMyCache.Local.get('key2') // null
```

### isExpired
Indicates whether the value has expired
`isExpired(key)`

#### Parameters
- {string} **key**

#### Return
**Boolean** :  (true) is expired || (false) is not expired

#### Exemples
```JS
// No expiration
OhMyCache.Local.set('key', 'value')
OhMyCache.Local.isExpired('key') // false

// No expired
OhMyCache.Local.set('key', 'value', {expire: 999999})
OhMyCache.Local.isExpired('key') // false

// Expired
OhMyCache.Local.set('key', 'value', {expire: 1})
// sleep 1 second or more
OhMyCache.Local.isExpired('key') // true
```


### isReadonly
Indicates whether the value is readonly
`isReadonly(key)`

#### Parameters
- {string} **key**

#### Return
**Boolean** :  (true) is read only || (false) is not read only

#### Exemples
```JS
// No readonly
OhMyCache.Local.set('key', 'value')
OhMyCache.Local.isReadonly('key') // false

// is readonly
OhMyCache.Local.set('key', 'value', {readonly: true})
OhMyCache.Local.isReadonly('key') // true
```
