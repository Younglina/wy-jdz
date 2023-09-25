const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const { ConstRouter } = require('../constvalue');
const getConnection = require('../utils/mysql')

router.post('/api/login', async (ctx) => {
  const conn = await getConnection()
  const query = 'SELECT * FROM user WHERE username = ? and password = ?'
  const [rows] = await conn.query(query, [ctx.request.body.username, ctx.request.body.password])
  const query2 = 'INSERT INTO user (username, password) VALUES (?, ?)';
  const values = [ctx.request.body.username, ctx.request.body.password];
  await conn.query(query2, values);
  console.log(rows)
  const userInfo = {
    id: 1,
    username: 'test',
    avator: '',
    likes: [],
    comment: []
  }
  conn.release();
  const token = jwt.sign(userInfo, 'wy-jdz-token')
  ctx.cookies.set('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
  ctx.body = { code: 200, data: { userInfo, menu: ConstRouter}, message: '登录成功' };
});

module.exports = router