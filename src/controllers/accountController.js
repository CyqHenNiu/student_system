// 引入path
const path = require('path');
// 引入图片验证码
const captchapng = require('captchapng');
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