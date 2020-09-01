var redisClient = require('redis-connection')();
redisClient.set('hello', 'world');
redisClient.get('hello', function (err, reply) {
  console.log('hello', reply.toString()); // hello world
});

redisClient.set("Hello", "World", redis.print);

redisClient.get("Hello", function(err, reply) {
   // reply is null when the key is missing
   console.log('Hello ' + reply.toString());
});