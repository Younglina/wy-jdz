const Koa = require('koa');
const cors = require('koa-cors');
const jsonError = require('koa-json-error');
const routerRouter = require('./routers/router');
const userRouter = require('./routers/user');

const app = new Koa();

// 添加跨域中间件
app.use(cors());

// 添加错误处理中间件
app.use(jsonError());

// 添加路由模块
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许发送 Cookie
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的请求方法
  ctx.set('Access-Control-Allow-Headers', 'Authorization, Content-Type'); // 允许的请求头
  await next();
});
app.use(routerRouter.routes())
app.use(userRouter.routes())
app.use(routerRouter.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});