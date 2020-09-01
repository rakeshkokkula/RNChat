#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'rpc_queue';

    channel.assertQueue(queue, {
      durable: false
    });
    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    channel.consume(queue, function reply(msg) {
      var n = parseInt(msg.content.toString());

      console.log(" [.] fib(%d)", n);

      var r = fibonacci(n);
      const mm = {
        "f": fibonacci(n),
        "msg":"hey hello"
      }
      // r.toString()
      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(JSON.stringify(mm)), {
          contentType: "applicaton/json",
          correlationId: msg.properties.correlationId,
          replyTo: msg.properties.replyTo,
          contentEncoding: "utf-8"
        });

      channel.ack(msg);
    });
  });
});

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}