// 用户相关接口

const router = require('express').Router()
const mysql = require('./mysql')

// 用户信息
router.get('/user', (req, res) => {
  console.log(req.session.user)
  if (req.session.user) {
    let user = JSON.parse(req.session.user)
    mysql(`SELECT * FROM user_admin where username='${user.username}' && password='${user.password}';`).then(rows => {
      req.session.user = JSON.stringify(rows[0])
      console.log(rows[0])
      return res.json({
        data: rows[0],
        code: 200
      })
    }).catch(err => {
      console.log(err)
    })
  } else {
    return res.json({
      data: '用户信息已失效',
      code: 666
    })
  }
})

// 登录
router.post('/login', (req, res, err) => {
  if (req.session.user) {
    return res.json({
      data: JSON.parse(req.session.user),
      code: 201
    })
  } else {
    mysql(`SELECT username, password FROM user_admin where username='${req.body.username}';`).then(result => {
      if (result.length !== 0 && result[0].password === req.body.password) {
        req.session.user = JSON.stringify(result[0])
        return res.json({
          data: result[0],
          code: 200
        })
      } else if (result.length !== 0) {
        return res.json({
          data: '用户名密码不正确',
          code: 200
        })
      } else if (result.length === 0) {
        return res.json({
          data: '账号不存在',
          code: 200
        })
      } else {
        return res.json({
          data: err,
          code: 500
        })
      }
    })
  }

})

// 登出
router.get('/logout', (req, res, err) => {
  req.session.user = null
  return res.json({
    code: 200
  })
})

module.exports = router
