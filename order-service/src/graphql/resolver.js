const Order = require('../models/order');
const { emitEvent } = require('../events/emitter');

const resolvers = {
    Query: {
        getOrder: async (_, { id }) => {
        const order = await Order.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
        },
        listOrders: async () => {
        return await Order.find({});
        },
    },
    Mutation: {
        createOrder: async (_, { userId, productId, quantity }) => {
        const order = new Order({ userId, productId, quantity });
        await order.save();
        emitEvent('order-placed', { order });
        return order;
        },
        shipOrder: async (_, { id }) => {
        const order = await Order.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        order.status = 'Shipped';
        await order.save();
        emitEvent('order-shipped', { order });
        return order;
        },
    },
};

module.exports = resolvers;