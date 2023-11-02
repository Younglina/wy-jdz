const getConnection = require('./mysql')

const Sqls = {
  getUserByNamePwd: 'SELECT username, id, rid, likes, login_status as loginStatus, create_time as createTime, update_time as updateTime FROM jdz.jdz_user WHERE username = ? and password = ?',
  getMenusByRole: `SELECT menus.* FROM roles
  JOIN menus ON FIND_IN_SET(menus.id, roles.menus_id)
  WHERE roles.id = ?`,
  upLoginStatus: `UPDATE jdz_user SET login_status=? WHERE id = ?`,
  upUserLikes: `UPDATE jdz_user SET likes=? WHERE id = ?`,
  upAreaLikes: `UPDATE jdz_area SET likes=likes+? WHERE areakey = ?`,
  addAreaComment: `INSERT INTO jdz_comment (areakey, content, created_at, images, userid) VALUES (?,?,?,?,?)`,
  getComment: `SELECT c.areakey as areakey, content, c.created_at as createdAt, c.images, userid, c.id, u.username as nickname, a.name as areaName, is_verify as isVerify
  FROM jdz.jdz_comment c
  LEFT JOIN jdz.jdz_user u ON u.id = c.userid
  LEFT JOIN jdz.jdz_area a ON a.areakey = c.areakey`,
  upComment: `UPDATE jdz_comment SET is_verify=? WHERE id = ?`,
}

const excuteSql = async (fn, values, extSql) => {
  try{
    const conn = await getConnection()
    const query = Sqls[fn] || fn
    const [rows] = await conn.query(query+(extSql||''), values)
    conn.release();
    return rows
  }catch(err){
    console.log(err)
    return { code: err.code, message: err.message, fail: true }
  }
}

module.exports = excuteSql