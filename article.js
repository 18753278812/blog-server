// 文章相关接口

const router = require('express').Router()
const mysql = require('./mysql')
const { enhtml, unhtml } = require('./plugin')



// 发布文章
router.post('/publish', (req, res) => {
  if (!req.session.user) {
    return res.json({
      code: 200,
      isSuccess: false,
      data: '请登录'
    })
  } else if (JSON.parse(req.session.user).username === 'admin') {
    if (req.body.title && req.body.content) {
      mysql(`INSERT INTO user_article (title, content, isDelete, date) VALUES ('${req.body.title}', '${unhtml(req.body.content)}', ${0}, ${new Date().getTime()});`).then(result => {
        console.log(result.affectedRows)
        if (result.affectedRows === 1) {
          return res.json({
            code: 200,
            data: '操作成功'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  } else {
    return res.json({
      code: 200,
      isSuccess: false,
      data: '权限不足'
    })
  }
})

module.exports = router