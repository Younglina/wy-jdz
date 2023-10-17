const Router = require('koa-router');
const router = new Router();
const axios = require('axios')

router.get('/vercel/getArea', async (ctx) => {
  const res = await axios.get('http://111.67.201.103:3001/api/getArea')
  ctx.body = res.data
})
module.exports = router