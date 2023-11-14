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
    // const menus = await getMenusByRoleid(ctx, cus.rid)
    excuteSql('upLoginStatus', [1, cus.id])
    const token = jwt.sign({ id: cus.id, rid: cus.rid, username: cus.username}, 'wy-jdz-token')
    ctx.cookies.set('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    ctx.body = { code: 200, data: { userInfo: cus}, message: '登录成功' };
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
  console.log(ctx.request)
  await login(ctx, ctx.request.body.username, ctx.request.body.password)
});

// router.post('/api/wx/login', async (ctx) => {
//   console.log(ctx.request.body, 'ctx.request.body.jsCode')
//   await wxLogin(ctx, ctx.request.body.jsCode)
// });

router.post('/api/updateLikes', async (ctx) => {
  const params = ctx.request.body
  await excuteSql('upUserLikes', [params.likes, params.userId])
  await excuteSql('upAreaLikes', [params.likeCount, params.areakey])
  ctx.body = { code: 200, message: '操作成功' };
});

router.get('/api/logout', jwtMiddleware, async (ctx) => {
  const user = ctx.state.user
  await excuteSql('upLoginStatus', [0, user.id])
  const token = jwt.sign({}, 'wy-jdz-token')
  ctx.cookies.set('token', token, { httpOnly: true, maxAge: 0 })
  ctx.body = { code: 200, message: '退出成功' };
});

router.post('/api/signUser', async (ctx) => {
  const addUser = 'INSERT INTO jdz_user (username, password, rid, likes) VALUES (?, ?, ?, "[]")';
  const params = ctx.request.body
  const creater = ctx.state.user || {}
  const rows = await excuteSql(addUser, [params.username, params.password, creater.rid==1?params.rid:4])
  if(rows.code === 'ER_DUP_ENTRY'){
    ctx.body = { code: 200, message: '昵称已存在', success: false };
  }
  await login(ctx, params.username, params.password)
})


router.get('/web/allUser', jwtMiddleware, async (ctx) => {
  const selectAllUser = 'SELECT username, id, rid, likes, login_status as loginStatus, create_time as createTime, update_time as updateTime FROM jdz.jdz_user LIMIT ? OFFSET ?';
  const selectAllUserCount = 'SELECT COUNT(*) AS total FROM jdz_user;';
  const curUser = ctx.state.user || {}
  const params = ctx.request.query
  const rows = await excuteSql(selectAllUser, [+params.limit, +params.offset])
  const rowCount = await excuteSql(selectAllUserCount)
  if(rows.fail){
    ctx.body = { code: -1, message: '查询失败' };
  }else{
    ctx.body = { code: 200, data: {
      list: rows.map(item=>{
        item.createTime = new Date(item.createTime).toLocaleString().replace(/\//g, '-')
        item.updateTime = new Date(item.updateTime).toLocaleString().replace(/\//g, '-')
        item.likes = item.likes?item.likes.join(','):''
        return item
      }),
      total: rowCount[0].total
    }, message: '查询成功' };
  }
})

module.exports = router