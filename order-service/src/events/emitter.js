const { Kafka } = require('kafkajs');
const dotenv = require('dotenv');

dotenv.config();

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const emitEvent = async (event, data) => {
    console.log(event);

    if(event==='order-placed'){
        await producer.send({
            topic: 'order-placed',
            messages: [{ value: JSON.stringify({ event, data }) }],
        });
    }else{
        await producer.send({
            topic: 'order-shipped',
            messages: [{ value: JSON.stringify({ event, data }) }],
        });
    }
};

const initProducer = async () => {
    await producer.connect();
};

module.exports = { emitEvent, initProducer };
