// 导入express
const express = require('express');
const path = require('path');
// 导入body-parser
const bodyParser = require('body-parser');
// 导入express-session
const session = require('express-session');

// 创建app
const app = express();

// 引入静态资源中间件
app.use(express.static(path.join(__dirname, 'statics')));

// 引用获取post请求的中间件
app.use(bodyParser.urlencoded({
    extended: false
}));

// 引用获取json格式的中间件
app.use(bodyParser.json());

// 引用设置session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100000
    }
}))

// 集成路由中间件
// 引入路由
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'));
// 如果请求是以account 交给它的路由处理
app.use('/account', accountRouter)

// 监听服务器
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err);
    }
    console.log("start OK");
})