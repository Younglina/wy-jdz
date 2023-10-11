const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const excuteSql = require('../utils/sql')
const jwtMiddleware = require('../middleware/jwt');
// const axios = require('axios')
async function login(ctx, username, password){
  const userInfo = await excuteSql('getUserByNamePwd', [username, password])
  if(!userInfo.length){
    ctx.status = 201;
    ctx.body = { code: 201, message: '用户名或密码错误' };
    return
  }else{
    const cus = userInfo[0]
    cus.likes = cus.likes && cus.likes.split(',')
    cus.comment = cus.comment && cus.comment.split(',')
    const menus = await getMenusByRoleid(ctx, cus.rid)
    excuteSql('upLoginStatus', [1, cus.id])
    const token = jwt.sign({ id: cus.id, rid: cus.rid, username: cus.username}, 'wy-jdz-token')
    ctx.cookies.set('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    ctx.body = { code: 200, data: { userInfo: cus, menu: menus}, message: '登录成功' };
  }
}

async function getMenusByRoleid(ctx, rid){
  const menus = await excuteSql("getMenusByRole", [rid])
  menus.forEach(item=>{
    item.meta = JSON.parse(item.meta)
    return item
  })
  return menus
}

router.post('/api/login', async (ctx) => {
  await login(ctx, ctx.request.body.username, ctx.request.body.password)
});

// router.post('/api/wx/login', async (ctx) => {
//   console.log(ctx.request.body, 'ctx.request.body.jsCode')
//   await wxLogin(ctx, ctx.request.body.jsCode)
// });

router.get('/api/logout', jwtMiddleware, async (ctx) => {
  const user = ctx.state.user
  await excuteSql('upLoginStatus', [0, user.id])
  const token = jwt.sign({}, 'wy-jdz-token')
  ctx.cookies.set('token', token, { httpOnly: true, maxAge: 0 })
  ctx.body = { code: 200, data: null, message: '退出成功' };
});

router.post('/api/addUser', jwtMiddleware, async (ctx) => {
  const addUser = 'INSERT INTO user (username, password, rid, likes, comment) VALUES (?, ?, ?, "", "")';
  const params = ctx.request.body
  const creater = ctx.state.user
  const rows = await excuteSql(addUser, [params.username, params.password, creater.rid==1?params.rid:4])
  if(rows.code === 'ER_DUP_ENTRY'){
    ctx.body = { code: 200, message: '用户名已存在' };
  }
  await login(ctx, params.username, params.password)
})

module.exports = router