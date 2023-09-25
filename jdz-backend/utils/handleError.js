const handleException = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err, err.code, err.status, err.statusCode, err.message);

    // 根据需要进行适当的处理，例如返回错误响应
    ctx.status = err.statusCode || err.status || 500;;
    ctx.body = { code: ctx.status, error: err.message };
  }
};

module.exports = {
  handleException
}