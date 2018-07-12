// 引入path
const path = require('path');
// 导出account路由控制器
exports.getLoginPage = (req, res) => {
    // 读取html文件
    res.sendFile(path.join(__dirname,'../views/login.html'));
}