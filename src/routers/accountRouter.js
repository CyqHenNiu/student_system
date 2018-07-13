// 引入express
const express = require('express');
const path = require('path');

// 创建路由
const accountRouter = express.Router();

// 处理请求
// 引入控制器
const accountCTRL = require(path.join(__dirname, '../controllers/accountController'));

// 如果请求login调用控制器的方法
accountRouter.get('/login', accountCTRL.getLoginPage);

// 请求图片验证码
accountRouter.get('/vcode', accountCTRL.getImgVcode);

// 请求注册页面
accountRouter.get('/register', accountCTRL.getRegisterPage);

// 注册用户
accountRouter.post('/register',accountCTRL.register);

// 用户登录
accountRouter.post('/login',accountCTRL.login);

// 导出路由
module.exports = accountRouter;