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
        var msg = process.argv.slice(2).join(' ') || "Hello World!!!";

        channel.assertQueue(queue, {
        durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
            })
    // setTimeout(function() { 
    //     connection.close(); 
    //     process.exit(0) 
    //     }, 500);
})

