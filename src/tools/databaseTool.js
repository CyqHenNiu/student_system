// 引入Mongodb数据库连接方法
const MongoClient = require('mongodb').MongoClient;
// 连接数据库服务地址
const URL = 'mongodb://localhost:27017';
// 数据库名称
const DBNAME = 'szhmqd18';

// 获取数据库连接
getDB = (backcall) => {
    // 连接数据库
    MongoClient.connect(URL, {
        useNewUrlParser: true
    }, function (err, client) {
        if (err) {
            console.log(err);
        }
        // 创建db对象  作为参数传给回调
        const db = client.db(DBNAME)
        backcall(err, db);
        // 操作完数据后 关闭数据库连接
        client.close();
    });
}


/**
 * 暴露查询一条数据的方法
 * @param {操作的集合名} collectionName 
 * @param {操作的数据} data 
 * @param {回调函数} backcall 
 */
exports.findOne = (collectionName, data, backcall) => {
    // 调用获取连接数据库方法
    getDB((err, db) => {
        // 查询一条数据
        db.collection(collectionName).findOne(data, function (err, docs) {
            // 调用回调函数
            backcall(err, docs);
        })
    })
}

// 暴露插入一条数据的方法
exports.insertOne = (collectionName, data, backcall) => {
    // 调用获取连接数据库方法
    getDB((err, db) => {
        // 插入一条数据
        db.collection(collectionName).insertOne(data, function (err, docs) {
            // 调用回调函数
            backcall(err, docs);
        })
    })
}

// 暴露查询多条数据的方法
exports.find = (collectionName, data, backcall) => {
    // 调用获取连接数据库方法
    getDB((err, db) => {
        // 查询数据
        db.collection(collectionName).find(data).toArray(function (err, docs) {
            // 调用回调函数
            backcall(err, docs);
        })
    })
}