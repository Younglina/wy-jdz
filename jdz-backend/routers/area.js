const Router = require('koa-router');
const router = new Router();
const excuteSql = require('../utils/sql')
const jwtMiddleware = require('../middleware/jwt');

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

router.post('/api/addArea', jwtMiddleware, async (ctx) => {
  const creater = ctx.state.user
  if(creater.rid != 1){
    ctx.body = { code: 401, message: '没有权限' };
  }
  const keys = `address, area_type, cost, created_at, data_type, description, introduction, areakey, latitude, likes, longitude, location, name, open_time, phone, tags, images, updated_at`
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
  let addArea = `SELECT id, address, area_type as areaType, cost, created_at as createdAt, data_type as dataType, description, introduction, areakey, latitude, likes, longitude, location, name, open_time as openTime, phone, tags, images, updated_at as updatedAt
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
router.get('/api/getAreaComment', async (ctx) => {
  let sql = `SELECT area_key as areakey, area_name as areaName, content, created_at as createdAt, images, nickname, userid, id
  FROM jdz_comment
  `;
  const query = ctx.request.query
  console.log(query, query.areakey)
  const values = []
  if(query.areakey){
    sql += 'WHERE area_key = ?'
    values.push(query.areakey)
  }
  const list = await excuteSql(sql, values)
  ctx.body = { code: 200, data: list, message: '获取评论成功' };
      
})

module.exports = router