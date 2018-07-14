// 引入path
const path = require('path');
// 引入图片验证码
const captchapng = require('captchapng');
// 引入操作数据库的工具方法
const databaseTool = require(path.join(__dirname, '../tools/databaseTool'));

// 导出account路由控制器获取登录页面的方法
exports.getLoginPage = (req, res) => {
    // 读取html文件
    res.sendFile(path.join(__dirname, '../views/login.html'));
}
// 导出account路由控制器获取图片验证码的方法
exports.getImgVcode = (req, res) => {
    // 生成随机验证码
    var code = parseInt(Math.random() * 9000 + 1000);
    // 保存验证码到session
    req.session.vcode = code;
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
    // 定义返回结果 0为注册成功  1为用户名已存在  2为注册失败
    const result = {
        status: 0,
        message: '注册成功'
    };
    // 接收数据
    const {
        userName
    } = req.body;

    // 调用操作数据库的方法
    databaseTool.findOne('userInfo', {
        userName
    }, (err, docs) => {
        // 判断是否查询到用户名
        if (docs != null) {
            // 存在用户名  修改返回结果
            result.status = 1;
            result.message = '用户名已存在';
            // 返回结果
            res.json(result)
        } else {
            databaseTool.insertOne('userInfo', req.body, (err, docs) => {
                if (docs == null) {
                    // 注册失败  修改返回结果
                    result.status = 2;
                    result.message = '注册失败';
                }
                // 返回结果
                res.json(result)
            })
        }
    })
}

// 导出用户登录验证方法
exports.login = (req, res) => {
    // 返回的登录信息  0为成功登录  1为验证码错误  2为账号或密码错误
    const result = {
        status: 0,
        message: '登录成功'
    }
    // 接收数据
    const {
        userName,
        password,
        vcode
    } = req.body;
    // 判断验证码是否正确
    if (vcode != req.session.vcode) {
        result.status = 1;
        result.message = '验证码错误';
        // 返回结果
        res.json(result);
        return
    }

    // 调用操作数据库的工具查询数据
    databaseTool.findOne('userInfo', {
        userName,
        password
    }, (err, docs) => {
        if (docs == null) {
            // 没查找到数据
            result.status = 2;
            result.message = '账号或密码错误';
        }
        // 返回结果
        res.json(result);
    })
}