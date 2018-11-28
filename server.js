const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()


app.all('*', (req, res, next) => {
	// res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", true)
  if(req.method=="OPTIONS") res.send(200);
  else next();
})

// post接参需要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  name: 'SESSION',
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  httponly: false,
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  }
}));

app.use('/port', require('./user'))
app.use('/port', require('./article'))
app.listen({
  port: 8848
})

console.log('服务启动')