const express = require("express");
const bodyParser = require("body-parser");//接收数据
const setting = require("./libs/setting");
const MongoUtil = require("./libs/mongoUtil");
const dbutil = new MongoUtil(setting.host,setting.post,setting.dbname);//数据库访问的对象
const ObjectId = require("mongodb").ObjectId;//要用到_id

const server = express();
server.listen(1900,function(){
    console.log("服务器已运行");
});
server.use(bodyParser.urlencoded({extended:false}));//解析请求中的数据用body-parser来解析，

server.all("*",function(req,res,next){ //允许跨域
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    next();
});
server.use("/seller",function(req,res){
    dbutil.find({},{},"seller",function(err,result){
        if(err) throw err;
        res.send({errno:0,data:result}).end();//errno:0表示没有错误
        // console.log(result);
    })
});
server.use("/goods",function(req,res){
    dbutil.find({},{},"goods",function(err,result){
        if(err) throw err;
        res.send({errno:0,data:result}).end();
        // console.log(result);
    })
});
server.use("/ratings",function(req,res){
    dbutil.find({},{},"ratings",function(err,result){
        if(err) throw err;
        res.send({errno:0,data:result}).end();
        // console.log(result);
    })
});