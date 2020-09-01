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
        const QUEUE = 'codingtest'
        channel.assertQueue(QUEUE)
        //Step 4: Send message to queue
        channel.sendToQueue(QUEUE,Buffer.from('hello from its coding time'))
        console.log(`Message send ${QUEUE}`)
    })
    setTimeout(function() { 
        connection.close(); 
        process.exit(0) 
        }, 500);
})

