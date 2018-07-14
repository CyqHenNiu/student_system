// 引入Mongodb数据库连接方法
const MongoClient = require('mongodb').MongoClient;
// 连接数据库服务地址
const URL = 'mongodb://localhost:27017';
// 数据库名称
const DBNAME = 'szhmqd18';
// 数据库id
const ObjectId = require('mongodb').ObjectId;
// 暴露出去
exports.ObjectId = ObjectId;
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
        backcall(db, client);

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
    getDB((db, client) => {
        // 查询一条数据
        db.collection(collectionName).findOne(data, function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    })
}
/**
 * 暴露插入一条数据的方法
 * @param {操作的集合名} collectionName 
 * @param {操作的数据} data 
 * @param {回调函数} backcall 
 */
exports.insertOne = (collectionName, data, backcall) => {
    // 调用获取连接数据库方法
    getDB((db, client) => {
        // 插入一条数据
        db.collection(collectionName).insertOne(data, function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    })
}

/**
 * 暴露查询数据的方法
 * @param {操作的集合名} collectionName 
 * @param {操作的数据} data 
 * @param {回调函数} backcall 
 */
exports.find = (collectionName, data, backcall) => {
    // 调用获取连接数据库方法
    getDB((db, client) => {
        // 查询数据
        db.collection(collectionName).find(data).toArray(function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    })
}


/**
 * 暴露更新一条数据的方法
 * @param {操作的集合名} collectionName 
 * @param {条件} condition
 * @param {操作的数据} data 
 * @param {回调函数} backcall 
 */
exports.updateOne = (collectionName, condition, data, backcall) => {
    // 调用获取连接数据库方法
    getDB((db, client) => {
        // 更新数据
        db.collection(collectionName).updateOne(condition, {
            $set: data
        }, function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    })
}

/**
 * 暴露删除一条数据的方法
 * @param {操作的集合名} collectionName 
 * @param {条件} condition
 * @param {回调函数} backcall 
 */
exports.deleteOne = (collectionName, condition, backcall) => {
    // 调用获取连接数据库方法
    getDB((db, client) => {
        // 删除数据
        db.collection(collectionName).deleteOne(condition, function (err, docs) {
            // 关闭数据库连接
            client.close();
            // 调用回调函数
            backcall(err, docs);
        })
    })
}