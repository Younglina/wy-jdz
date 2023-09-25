const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const { ConstRouter } = require('../constvalue');

router.get('/api/login', async (ctx) => {
  const userInfo = {
    id: 1,
    username: 'test',
    avator: '',
    likes: [],
    comment: []
  }

  const token = jwt.sign(userInfo, 'wy-jdz-token')
  ctx.cookies.set('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
  ctx.body = { code: 200, data: { userInfo, menu: ConstRouter}, message: '登录成功' };
});

module.exports = router