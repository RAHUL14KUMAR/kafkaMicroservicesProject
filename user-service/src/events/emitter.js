const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const emitEvent = async (event, data) => {
    await producer.send({
        topic: 'user-events',
        messages: [
        { value: JSON.stringify({ event, data }) },
        ],
    });
};

const initProducer = async () => {
    await producer.connect();
};

module.exports = { emitEvent, initProducer };