// 引入xtpl
const xtpl = require('xtpl');
const path = require('path');
// 引入Mongodb数据库连接方法
const MongoClient = require('mongodb').MongoClient;
// 连接数据库服务地址
const url = 'mongodb://localhost:27017';
// 数据库名称
const dbName = 'szhmqd18';


// 暴露获取学生列表的方法
exports.getListPage = (req, res) => {
    // 接收数据 没有数据就为空字符
    const keyword = req.query.keyword || '';
    // 连接数据库
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        // 需要查询的文档
        const collection = db.collection('studentInfo');
        // 查询学生列表信息  模糊查询
        collection.find({
            name: {
                $regex: keyword
            }
        }).toArray(function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 引入模板引擎
            xtpl.renderFile(path.join(__dirname, '../views/list.html'), {
                studentList: docs,
                // 将查询的关键字也传给浏览器
                keyword
            }, (err, content) => {
                // 返回结果
                res.send(content);
            })
        })
    })

}