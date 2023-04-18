const connection = require("../app/database")

class ArticleService {
  async createArticle_s(user_id, title, content,lable) {
    const statement = `INSERT INTO article (user_id,title,content,lable) VALUES (?,?,?,?)`
    const [res]=await connection.execute(statement, [user_id, title, content,lable])
    return res.insertId
  }
  async getArticleDetail_s(articleId,userId) {
    const statement = `
        SELECT 
            a.id articleId,a.title title,a.content content,a.lable lable,DATE_FORMAT(a.updateAt, '%Y-%m-%d %H:%i:%s' ) updateAt,
            JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url) author,
            (SELECT COUNT(*) FROM comment c WHERE c.article_id=a.id) commentCount,
            (SELECT COUNT(*) FROM likeArticle l WHERE l.article_id=a.id) likeCount,
            (SELECT COUNT(*) FROM likeArticle l WHERE l.article_id=? AND l.user_id=?) isLiked,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/article/getPicture/',articlePic.filename)) FROM articlePic WHERE a.id=articlePic.article_id) images
        FROM article a
        LEFT JOIN user u ON a.user_id=u.id
        WHERE a.id=?`
    const [res] = await connection.execute(statement, [articleId,userId,articleId])
    return res[0]
  }
  async getArticleList_s(offset, size ,value,type) {
    const statement = `
        SELECT 
            a.id articleId,a.title title,a.content content,a.lable lable,DATE_FORMAT(a.updateAt, '%Y-%m-%d %H:%i:%s' ) updateAt,
            JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url) author,
            (SELECT COUNT(*) FROM comment c WHERE c.article_id=a.id) commentCount,
            (SELECT COUNT(*) FROM likeArticle l WHERE l.article_id=a.id) likeCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/article/getPicture/',articlePic.filename)) FROM articlePic WHERE a.id=articlePic.article_id) images
        FROM article a
        LEFT JOIN user u ON a.user_id=u.id
        WHERE a.${type}=?
        ORDER BY a.updateAt DESC
        LIMIT ?,?`
      const [res] = await connection.execute(statement, [value,offset,size])
      return res
  }
  async deleteArticle_s(articleId){
    const statement=`DELETE FROM article WHERE id=?`
    await connection.execute(statement,[articleId])
  }
  async getAriclePic_s(articleId){
    const statement=`SELECT filename FROM articlePic WHERE article_id=?`
    const [res]=await connection.execute(statement,[articleId])
    return res
  }
  async addArticleLike_s(articleId,userId){
    const statement=`INSERT INTO likeArticle (user_id,article_id) VALUES (?,?)`
    await connection.execute(statement,[userId,articleId])
  }
  async delArticleLike_s(articleId,userId){
    const statement=`DELETE FROM likeArticle WHERE user_id=? AND article_id=?`
    await connection.execute(statement,[userId,articleId])
  }
  async getLikeArticle_s(userId,offset,size){
    const statement=`
        SELECT 
            a.id articleId,a.title title,a.content content,a.lable lable,DATE_FORMAT(a.updateAt, '%Y-%m-%d %H:%i:%s' ) updateAt,
            JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url) author,
            (SELECT COUNT(*) FROM comment c WHERE c.article_id=a.id) commentCount,
            (SELECT COUNT(*) FROM likeArticle l WHERE l.article_id=a.id) likeCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/article/getPicture/',articlePic.filename)) FROM articlePic WHERE a.id=articlePic.article_id) images
        FROM article a
        LEFT JOIN user u ON a.user_id=u.id
        LEFT JOIN likeArticle l ON a.id=l.article_id
        WHERE l.user_id=?
        ORDER BY l.updateAt DESC
        LIMIT ?,?`
    const [res] = await connection.execute(statement, [userId,offset,size])
    return res
  }
}

module.exports = new ArticleService()
