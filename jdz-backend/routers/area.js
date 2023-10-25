const Router = require('koa-router');
const router = new Router();
const excuteSql = require('../utils/sql')
const uploadFiles = require('../utils/useCos')
const jwtMiddleware = require('../middleware/jwt');

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

router.post('/api/addArea', jwtMiddleware, async (ctx) => {
  const creater = ctx.state.user
  if(creater.rid != 1){
    ctx.body = { code: 401, message: '没有权限' };
  }
  const keys = `address, area_type, cost, created_at, data_type, description, introduction, area_key, latitude, likes, longitude, location, name, open_time, phone, tags, images, updated_at`
  const addArea = `INSERT INTO jdz_area (${keys}) VALUES (${keys.split(',').map(_=>`?`).join(', ')})`;
  const values = []
  const params = ctx.request.body
  keys.split(', ').forEach(key => {
    if(key==='tags'){
      values.push(JSON.stringify(params[key] || ''))
    }else{
      values.push(params[snakeToCamel(key)] || '')
    }
  })
  await excuteSql(addArea, values)
  ctx.body = { code: 200, message: '新增成功' };
})

router.get('/api/getArea', async (ctx) => {
  let addArea = `SELECT id, address, area_type as areaType, cost, created_at as createdAt, data_type as dataType, description, introduction, area_key as areakey, latitude, likes, longitude, location, name, open_time as openTime, phone, tags, images, updated_at as updatedAt
  FROM jdz_area
  `;
  const query = ctx.request.query
  const values = []
  if(query.dataType){
    addArea += 'WHERE data_type = ?'
    values.push(query.dataType)
  }
  const list = await excuteSql(addArea, values)
  ctx.body = { code: 200, data: list, message: '获取列表成功' };
})

router.get('/api/getAreaFromType', async (ctx) => {
  const query = ctx.request.query
  const jsonData = require('../webdata/qunar.json')
  ctx.body = { code: 200, data: jsonData, message: `获取${query.dataType}成功` };
      
})

router.post('/api/addAreaComment', async (ctx) => {
  const data = ctx.request.body
  console.log(data)
  const res = {}
  await excuteSql('addAreaComment', [data.areaKey, data.content, new Date(), JSON.stringify(data.images.map(item=>item.filename)), data.userid])
  uploadFiles(data.images)
  ctx.body = { code: 200, message: res.message || '新增评论成功', success: !!res.code };
})

router.get('/api/getAreaComment', async (ctx) => {
  const query = ctx.request.query
  let list = []
  if(query.areakey){
    list = await excuteSql('getAreaCommentByArea', [query.areakey])
  }else{
    list = await excuteSql('getAreaCommentByUser', [query.userid])
  }
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  list.map(item=>{
    if(item.id>39){
      item.images = item.images.map(img=>'wechat/'+img)
    }
    return item
  })
  ctx.body = { code: 200, data: list, message: '获取评论成功' };
})


module.exports = router