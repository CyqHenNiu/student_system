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

// 获取添加学生列表请求
studentManagerRouter.post('/add', studentManagerCTRL.addInfo);

// 获取编辑学生页面
studentManagerRouter.get('/edit/:studentId', studentManagerCTRL.getEditPage);

// 获取编辑学生请求
studentManagerRouter.post('/edit/:studentId', studentManagerCTRL.editStudent);

// 获取删除学生请求
studentManagerRouter.get('/deleteStudent/:studentId', studentManagerCTRL.deleteStudent);

// 获取登出请求
studentManagerRouter.get('/logout', studentManagerCTRL.logout)

// 导入路由
module.exports = studentManagerRouter;