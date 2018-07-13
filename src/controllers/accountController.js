// 引入path
const path = require('path');
// 引入图片验证码
const captchapng = require('captchapng');
// 引入Mongodb数据库连接方法
const MongoClient = require('mongodb').MongoClient;
// 连接数据库服务地址
const url = 'mongodb://localhost:27017';
// 数据库名称
const dbName = 'szhmqd18';

// 导出account路由控制器获取登录页面的方法
exports.getLoginPage = (req, res) => {
    // 读取html文件
    res.sendFile(path.join(__dirname, '../views/login.html'));
}
// 导出account路由控制器获取图片验证码的方法
exports.getImgVcode = (req, res) => {
    // 生成随机验证码
    var code = parseInt(Math.random() * 9000 + 1000);
    // 保存验证码
    // req.session.checkcode = code;
    var p = new captchapng(80, 30, code);
    // 背景颜色
    p.color(0, 0, 0, 0);
    // 数字颜色
    p.color(80, 80, 80, 255);
    // base64加密
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    // 设置响应头
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    // 返回图片
    res.end(imgbase64);
}

// 导出注册页面的方法
exports.getRegisterPage = (req, res) => {
    // 返回注册页面结果给浏览器
    res.sendFile(path.join(__dirname, '../views/register.html'));
}

// 导出判断注册信息的方法
exports.register = (req, res) => {
    // 接收数据
    const {
        userName
    } = req.body;
    // 定义返回结果 0为注册成功  1为用户名已存在  2为注册失败
    let result = {
        status: 0,
        message: '注册成功'
    };
    // 连接数据库
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        // 需要查询的文档
        const collection = db.collection('studentsInfo');
        // 查询用户名
        collection.findOne({
            userName
        }, function (err, docs) {
            // 判断是否查询到用户名
            if (docs != null) {
                // 存在用户名  修改返回结果
                result.status = 1;
                result.message = '用户名已存在';
                // 关闭数据库连接
                client.close();
                // 返回结果
                res.json(result)
            } else {
                // 用户名不存在 将用户名密码插入数据库中
                collection.insertOne(req.body, function (err, insResult) {
                    if (insResult == null) {
                        // 注册失败  修改返回结果
                        result.status = 2;
                        result.message = '注册失败';
                        // 关闭数据库连接
                        client.close();
                        // 返回结果
                        res.json(result)
                    } else {
                        // 注册成功
                        // 关闭数据库连接
                        client.close();
                        // 返回结果
                        res.json(result)
                    }
                });
            }
        });


    });
}