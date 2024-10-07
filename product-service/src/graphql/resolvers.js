const Product = require('../models/product');
const { emitEvent } = require('../events/emitter');

const resolvers = {
    Query: {
        getProduct: async (_, { id }) => {
            const productInfo=await Product.findById(id);
            if(!productInfo){
                throw new Error('Product not found');
            }
        },
        listProducts: async () => {
            return await Product.find({});
        },
    },
  Mutation: {
    createProduct: async (_, { name, description, price, inventory }) => {
        const product = new Product({ name, description, price, inventory });
        await product.save();
        emitEvent('product-created',{product:product});
        return product;
    },
    updateProduct: async (_, { id, name, description, price, inventory }) => {
      const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (inventory) product.inventory = inventory;
        await product.save();

        emitEvent('product-updated',{product:product});
        return product;
        }
    }
}
module.exports = resolvers;