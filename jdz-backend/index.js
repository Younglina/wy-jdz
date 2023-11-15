const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routerRouter = require('./routers/router');
const userRouter = require('./routers/user');
const areaRouter = require('./routers/area');
const webRouter = require('./routers/web');
const static = require('koa-static');
const { handleException } = require('./utils/handleError');
const app = new Koa();

// 添加路由模块
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', 'true'); // 允许发送 Cookie
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin); // 允许发送 Cookie
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的请求方法
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Content-Type', 'application/json;charset=utf-8');
    // 对于预检请求（OPTIONS请求），直接返回200状态码
  if (ctx.method === 'OPTIONS') {
    ctx.status=204;
    ctx.body=""
  } else {
    await next();
  }
});

// 添加错误处理中间件
app.use(bodyParser());

app.use(routerRouter.routes())
app.use(routerRouter.allowedMethods());
app.use(userRouter.routes())
app.use(userRouter.allowedMethods());
app.use(areaRouter.routes())
app.use(areaRouter.allowedMethods());
app.use(webRouter.routes())
app.use(webRouter.allowedMethods());

// 设置静态文件目录
app.use(static('../jdz-web/dist'));
app.use(handleException);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});