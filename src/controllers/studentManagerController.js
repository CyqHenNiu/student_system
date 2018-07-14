// 引入xtpl
const xtpl = require('xtpl');
const path = require('path');
// 引入数据库工具方法
const databaseTool = require(path.join(__dirname, '../tools/databaseTool'));

// 暴露获取学生列表的方法
exports.getListPage = (req, res) => {
    // 接收数据 没有数据就为空字符
    const keyword = req.query.keyword || '';

    // 调用查询数据的方法
    databaseTool.find('studentInfo', {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {
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
}

// 暴露添加学生列表页面的方法
exports.getAddPage = (req, res) => {
    // 调用模板引擎
    xtpl.renderFile(path.join(__dirname, '../views/add.html'), {}, (err, content) => {
        // 返回结果给浏览器
        res.send(content);
    })
}

// 暴露添加学生信息的方法
exports.addInfo = (req, res) => {
    // 调用插入一条数据的方法
    databaseTool.insertOne('studentInfo', req.body, (err, docs) => {
        if (docs != null) {
            // 添加成功 返回学生列表页面
            res.end('<script>window.location.href = "/studentmanager/list"</script>')
        } else {
            // 添加失败弹出窗口
            res.end('<script>alert("新增学生信息失败")</script>')
        }
    })
}