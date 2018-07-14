// 引入Mongodb数据库连接方法
const MongoClient = require('mongodb').MongoClient;
// 连接数据库服务地址
const URL = 'mongodb://localhost:27017';
// 数据库名称
const DBNAME = 'szhmqd18';


/**
 * 暴露查询一条数据的方法
 * @param {操作的集合名} collectionName 
 * @param {操作的数据} data 
 * @param {回调函数} backcall 
 */
exports.findOne = (collectionName, data, backcall) => {
    // 连接数据库
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(DBNAME);
        // 需要查询的文档
        const collection = db.collection(collectionName);
        // 查询用户名
        collection.findOne(data, function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    });
}

// 暴露插入一条数据的方法
exports.insertOne = (collectionName, data, backcall) => {
    // 连接数据库
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(DBNAME);
        // 需要查询的文档
        const collection = db.collection(collectionName);
        // 查询用户名
        collection.insertOne(data, function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    });
}

// 暴露查询多条数据的方法
exports.find = (collectionName, data, backcall) => {
    // 连接数据库
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(DBNAME);
        const collection = db.collection(collectionName);
        // 查询学生列表信息  模糊查询
        collection.find(data).toArray(function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    })
}