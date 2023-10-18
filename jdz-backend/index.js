const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const routerRouter = require('./routers/router');
const userRouter = require('./routers/user');
const areaRouter = require('./routers/area');
const mockRouter = require('./routers/mock');
const { handleException } = require('./utils/handleError');
const app = new Koa();

// 添加路由模块
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许发送 Cookie
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的请求方法
  await next();
});
// 添加跨域中间件
app.use(cors());

// 添加错误处理中间件
app.use(bodyParser());

app.use(routerRouter.routes())
app.use(routerRouter.allowedMethods());
app.use(userRouter.routes())
app.use(userRouter.allowedMethods());
app.use(areaRouter.routes())
app.use(areaRouter.allowedMethods());
app.use(mockRouter.routes())
app.use(mockRouter.allowedMethods());
app.use(handleException);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});