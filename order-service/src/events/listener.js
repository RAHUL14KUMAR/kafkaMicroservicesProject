const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: [process.env.KAFKA_BROKER],
});


const consumer = kafka.consumer({ groupId: 'product-service-group' });

const initConsumer = async () => {
    console.log("consumer from order code part");
    await consumer.connect();
    await consumer.subscribe({ topic: 'product-created', fromBeginning: true });

    await consumer.subscribe({ topic: 'user-created', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log("from order side",event);    
        },
    });
}

module.exports = { initConsumer };
