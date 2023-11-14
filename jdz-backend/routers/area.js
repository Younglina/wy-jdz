const Router = require('koa-router');
const router = new Router();
const excuteSql = require('../utils/sql')
const uploadFiles = require('../utils/useCos')
const jwtMiddleware = require('../middleware/jwt');

const multer = require('@koa/multer')
const upload = multer();

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

router.post('/api/upload', jwtMiddleware, upload.single('file'), async (ctx) => {
  const creater = ctx.state.user
  if (creater.rid != 1) {
    ctx.body = { code: 401, message: '没有权限' };
  }
  const params = ctx.request.body
  if (params.filename) {
    const res = await uploadFiles([{ file: ctx.file.buffer, filename: params.filename }], 'blog')
    console.log(res, 'asdfasdf')
    ctx.body = {
      "code": 200,
      "data": res.map(item => {
        return { url: item.url, filename: item.filename }
      })
    }
  }
})

router.post('/api/addArea', jwtMiddleware, async (ctx) => {
  const creater = ctx.state.user
  if (creater.rid != 1) {
    ctx.body = { code: 401, message: '没有权限' };
  }
  const params = ctx.request.body
  if (params.newImages.length) {
    const res = await uploadFiles(params.newImages)
    params.images.push(...res.filter(item => item.success).map(item => item.filename))
    console.log(res, 'asdfasdf')
  }
  const keys = `address, area_type, cost, data_type, description, introduction, areakey, latitude, longitude, location, name, open_time, phone, tags, images, created_at, updated_at`;
  if (params.id) {
    let updateArea = `UPDATE jdz_area SET `;
    const values = [], sqks = []
    keys.split(', ').forEach(key => {
      sqks.push(`${key} = ?`)
      if (key === 'tags') {
        values.push(JSON.stringify(params[key] || ''))
      } else if (key === 'updated_at') {
        values.push(new Date().toISOString())
      } else if (key === 'images') {
        values.push(JSON.stringify(params.images))
      } else {
        values.push(params[snakeToCamel(key)] || '')
      }
    })
    values.push(params.id)
    updateArea += sqks.join(',') + ` WHERE id = ?`
    await excuteSql(updateArea, values)
    ctx.body = { code: 200, message: '更新成功' };
  } else {
    const addArea = `INSERT INTO jdz_area (${keys}) VALUES (${keys.split(',').map(_ => `?`).join(', ')})`;
    const values = []
    keys.split(', ').forEach(key => {
      if (key === 'tags') {
        values.push(JSON.stringify(params[key] || ''))
      } else if (key === 'created_at' || key === 'updated_at') {
        values.push(new Date().toISOString())
      } else if (key === 'images') {
        console.log(params[key])
        values.push(JSON.stringify(params.images))
      } else {
        values.push(params[snakeToCamel(key)] || '')
      }
    })
    await excuteSql(addArea, values)
    ctx.body = { code: 200, message: '新增成功' };
  }
})

router.get('/api/getArea', async (ctx) => {
  let addArea = `SELECT id, address, area_type as areaType, cost, created_at as createdAt, data_type as dataType, description, introduction, areakey, latitude, likes, longitude, location, name, open_time as openTime, phone, tags, images, updated_at as updatedAt
  FROM jdz_area
  `;
  const query = ctx.request.query
  const values = []
  if (query.dataType) {
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
  await excuteSql('addAreaComment', [data.areaKey, data.content, new Date(), JSON.stringify(data.images.map(item => item.filename)), data.userid])
  uploadFiles(data.images)
  ctx.body = { code: 200, message: res.message || '新增评论成功', success: !!res.code };
})

router.get('/api/getAreaComment', async (ctx) => {
  const query = ctx.request.query
  let list = []
  if (query.areakey) {
    list = await excuteSql('getComment', [query.areakey], ' WHERE c.areakey = ?')
  } else if (query.userid) {
    list = await excuteSql('getComment', [query.userid], ' WHERE c.userid = ?')
  }
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  list.map(item => {
    if (item.id > 39) {
      item.images = item.images.map(img => 'wechat/' + img)
    }
    return item
  })
  ctx.body = { code: 200, data: list, message: '获取评论成功' };
})

router.get('/web/getComment', jwtMiddleware, async (ctx) => {
  const creater = ctx.state.user
  const query = ctx.request.query
  if (creater.rid != 1) {
    ctx.body = { code: 401, message: '没有权限' };
  }
  let extSql = [], values = []
  if (query.id) {
    extSql.push(`c.id = ?`)
    values.push(query.id)
  }
  if (query.isVerify != undefined && query.isVerify != '') {
    extSql.push(`c.is_verify = ?`)
    values.push(query.isVerify)
  }
  let list = await excuteSql('getComment', values, extSql.length ? (' WHERE ' + extSql.join(' AND ')) : '')
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  list.map(item => {
    if (item.id > 39) {
      item.images = item.images.map(img => 'wechat/' + img)
    }
    item.createdAt = item.createdAt.slice(0, 19)
    return item
  })
  ctx.body = { code: 200, data: list, message: '获取评论成功' };
})

router.get('/web/verifyComment', jwtMiddleware, async (ctx) => {
  const creater = ctx.state.user
  console.log(creater, creater.rid != 1)
  if (creater.rid != 1) {
    ctx.body = { code: 401, message: '没有权限' };
  } else {
    const query = ctx.request.query
    let res = await excuteSql('upComment', [query.isVerify, query.id])
    ctx.body = { code: 200, message: res.message || '审核成功' };
  }
})


module.exports = router