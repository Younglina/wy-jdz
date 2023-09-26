const Router = require('koa-router');
const router = new Router();

router.get('/api/getRoutes', async (ctx) => {
  // ctx.body = { code: 200, data: ConstRouter, message: '获取路由表成功' };
});

module.exports = router