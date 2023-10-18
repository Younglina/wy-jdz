const Router = require('koa-router');
const router = new Router();
const axios = require('axios')

router.get('/api/mock/getArea', async (ctx) => {
  const res = await axios.get('http://111.67.201.103:3001/api/getArea')
  ctx.body = res.data
})
router.get('/api/mock/commend', async (ctx) => {
  const res = await axios.get('https://www.fastmock.site/mock/b4d00c361872b35cd786f9536d504667/jdz/commend')
  ctx.body = res.data
})
module.exports = router