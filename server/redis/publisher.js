// publisher.js
const redis = require('redis');

const publisher = redis.createClient();

publisher.publish('my channel', 'hi');

publisher.publish('my channel 1', 'hello world 1');