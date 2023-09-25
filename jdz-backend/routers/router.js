const Router = require('koa-router');
const router = new Router();
const { ConstRouter } = require('../constvalue.js');
const jwtMiddleware = require('../middleware/jwt');

router.get('/api/getRoutes', jwtMiddleware, async (ctx) => {
  ctx.body = { code: 200, data: ConstRouter, message: '获取路由表成功' };
});

module.exports = router