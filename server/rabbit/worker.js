const amqp = require('amqplib/callback_api')

// Step 1: Create Connecton
amqp.connect('amqp://localhost', (connErr, connection) => {
    if(connErr){
        throw connErr
    }
    //Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError
        }
        //Step 3: Assert Queue
        var queue = 'task_queue';

        // This makes sure the queue is declared before attempting to consume from it
        channel.assertQueue(queue, {
        durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
        var secs = msg.content.toString().split('.').length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function() {
            console.log(" [x] Done");
            channel.ack(msg);
        }, secs * 1000);
        }, {
            // manual acknowledgment mode,
            // see https://www.rabbitmq.com/confirms.html for details
            noAck: false
        });
    })
})