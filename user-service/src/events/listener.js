const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: [process.env.KAFKA_BROKER],
});


const consumer = kafka.consumer({ groupId: 'user-service-group' });

const initConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log(`Received event: ${event.event} - ${JSON.stringify(event.data)}`);
        },
    });
}

module.exports = { initConsumer };
