const getConnection = require('./mysql')

const Sqls = {
  getUserByNamePwd: 'SELECT * FROM user WHERE username = ? and password = ?',
  getMenusByRole: `SELECT menus.* FROM roles
  JOIN menus ON FIND_IN_SET(menus.id, roles.menus_id)
  WHERE roles.id = ?`,
  upLoginStatus: `UPDATE user
	SET login_status=?
	WHERE id = ?`
}

const excuteSql = async (fn, values) => {
  try{
    const conn = await getConnection()
    const query = Sqls[fn] || fn
    const [rows] = await conn.query(query, values)
    conn.release();
    return rows
  }catch(err){
    console.log(err)
    return { code: err.code, message: err.message }
  }
}

module.exports = excuteSql