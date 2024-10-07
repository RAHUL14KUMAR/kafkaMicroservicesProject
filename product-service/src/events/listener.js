const { Kafka } = require('kafkajs');
const UpdateProduct=require('../service/UpdateProduct')

const kafka = new Kafka({
    clientId: 'product-service',
    brokers: [process.env.KAFKA_BROKER],
});


const consumer = kafka.consumer({ groupId: 'order-service-group' });

const consumer2 = kafka.consumer({ groupId: 'product-service-group' });

const initConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'order-placed', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        await UpdateProduct(event);
        console.log(`Received event from product side: ${event.event} - ${JSON.stringify(event.data)}`);
        },
    });
}

const initConsumer2=async()=>{
    await consumer2.connect();
    await consumer2.subscribe({ topic: 'product-updated', fromBeginning: true });

    await consumer2.run({
        eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log(`Received event from product side: ${event.event} - ${JSON.stringify(event.data)}`);
        },
    });
}

module.exports = { initConsumer,initConsumer2 };
