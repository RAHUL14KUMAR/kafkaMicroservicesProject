const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');

dotenv.config();

const kafka = new Kafka({
    clientId: 'product-service',
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const emitEvent = async (event, data) => {

    if(event==='product-created'){
        await producer.send({
            topic: 'product-created',
            messages: [{ value: JSON.stringify({ event, data }) }],
        });
    }else{
        await producer.send({
            topic: 'product-updated',
            messages: [{ value: JSON.stringify({ event, data }) }],
        });
    }
};

const initProducer = async () => {
    await producer.connect();
};

module.exports = { emitEvent, initProducer };
