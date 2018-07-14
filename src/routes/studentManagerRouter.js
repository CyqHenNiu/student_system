// 引入express
const express = require('express');
const path = require('path');

// 创建路由
const studentManagerRouter = express.Router();

// 引入控制器
const studentManagerCTRL = require(path.join(__dirname, '../controllers/studentManagerController'));

// 路由处理请求 调用获取列表页面的方法
studentManagerRouter.get('/list', studentManagerCTRL.getListPage);

// 获取添加列表页面
studentManagerRouter.get('/add', studentManagerCTRL.getAddPage);

// 获取添加学生列表方法
studentManagerRouter.post('/add', studentManagerCTRL.addInfo);

// 导入路由
module.exports = studentManagerRouter;