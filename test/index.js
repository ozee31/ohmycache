var context = require.context('./specs', true, /\.spec$/);
context.keys().forEach(context);
console.log(context.keys());