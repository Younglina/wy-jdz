const getConnection = require('./mysql')

const Sqls = {
  getUserByNamePwd: 'SELECT * FROM jdz_user WHERE username = ? and password = ?',
  getMenusByRole: `SELECT menus.* FROM roles
  JOIN menus ON FIND_IN_SET(menus.id, roles.menus_id)
  WHERE roles.id = ?`,
  upLoginStatus: `UPDATE jdz_user SET login_status=? WHERE id = ?`,
  upUserLikes: `UPDATE jdz_user SET likes=? WHERE id = ?`,
  upAreaLikes: `UPDATE jdz_area SET likes=likes+? WHERE area_key = ?`,
  addAreaComment: `INSERT INTO jdz_comment (area_key, content, created_at, images, userid) VALUES (?,?,?,?,?)`,
  getAreaCommentByUser: `SELECT c.area_key as areakey, content, c.created_at as createdAt, c.images, userid, c.id, u.username as nickname, a.name as areaName
  FROM jdz.jdz_comment c
  LEFT JOIN jdz.jdz_user u ON u.id = c.userid
  LEFT JOIN jdz.jdz_area a ON a.area_key  = c.area_key
  WHERE c.userid = ?`,
  getAreaCommentByArea: `SELECT c.area_key as areakey, content, c.created_at as createdAt, c.images, userid, c.id, u.username as nickname, a.name as areaName
  FROM jdz.jdz_comment c
  LEFT JOIN jdz.jdz_user u ON u.id = c.userid
  LEFT JOIN jdz.jdz_area a ON a.area_key  = c.area_key
  WHERE c.area_key = ?`
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