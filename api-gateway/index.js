const express=require('express');
const {createProxyMiddleware}=require('http-proxy-middleware');

const app=express();
const port=3000;

app.use('/user', createProxyMiddleware({
    target: 'http://user-service:4000',
    changeOrigin: true,
    pathRewrite: {
        '^/user': ''
    },
}))

app.use('/product',createProxyMiddleware({
    target: 'http://product-service:4001',
    changeOrigin: true,
    pathRewrite:{
        '^product':''
    }
}))

app.use('/order',createProxyMiddleware({
    target: 'http://order-service:4002',
    changeOrigin: true,
    pathRewrite:{
        '^order':''
    }
}))

app.get('/',(rq,res)=>{
    res.status(201).json({message:"welcome for testing"});
})

app.listen(port,()=>{
    console.log(`API Gateway Services listening at http://localhost:${port}`)}
);