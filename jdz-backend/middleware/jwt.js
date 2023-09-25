const jwt = require('jsonwebtoken');
const jwtMiddleware = async (ctx, next) => {
  // 从 Cookie 中获取 JWT
  const token = ctx.cookies.get('token');
  
  if (token) {
    try {
      // 验证 JWT
      const decoded = jwt.verify(token, 'wy-jdz-token');

      // 将解码后的用户信息添加到请求上下文中
      ctx.state.user = decoded;
    } catch (error) {
      // JWT 验证失败
      ctx.status = 401;
      ctx.body = { error: 'Invalid token' };
      return;
    }
  } else {
    // Cookie 中没有 JWT
    ctx.status = 401;
    ctx.body = { error: 'Missing token' };
    return;
  }

  await next();
};

module.exports = jwtMiddleware