const  Product=require('../models/product')
const updateProduct=async(event)=>{
    // console.log("inside the service route",event.data);
    const product=await Product.findById(event.data.order.productId);
    if(product){
        product.inventory-=event.data.order.quantity;
        await product.save();
    }
}

module.exports=updateProduct