const express=require('express');
const {createProxyMiddleware}=require('http-proxy-middleware');

const app=express();
const port=3000;

app.use('/user',createProxyMiddleware({
    target: 'http://localhost:4000/graphql',
    changeOrigin: true,
    pathRewrite:{
        '^user':''
    }
}))

app.use('/product',createProxyMiddleware({
    target: 'http://localhost:4001/graphql',
    changeOrigin: true,
    pathRewrite:{
        '^product':''
    }
}))

app.use('/order',createProxyMiddleware({
    target: 'http://localhost:4002/graphql',
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