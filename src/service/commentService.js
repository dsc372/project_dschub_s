const connection = require("../app/database")

class CommentService {
    async createComment_s(user_id,articleId,content){
        const statement=`INSERT INTO comment (user_id,article_id,content) VALUES(?,?,?)`
        const [res]=await connection.execute(statement,[user_id,articleId,content])
        const [commentInfo]=await this.getSingleComment_c(res.insertId)
        return commentInfo
    }
    async replyComment_s(user_id,articleId,commentId,content){
        const statement=`INSERT INTO comment (user_id,article_id,comment_id,content) VALUES(?,?,?,?)`
        const [res]=await connection.execute(statement,[user_id,articleId,commentId,content])
        const [commentInfo]=await this.getSingleComment_c(res.insertId)
        return commentInfo
    }
    async deleteComment_s(comment_id){
        const [res]=await this.getSingleComment_c(comment_id)
        const {replyCount}=res
        const statement=`DELETE FROM comment WHERE id=?`
        await connection.execute(statement,[comment_id])
        return replyCount
    }
    async getCommentList_s(offset,size,value,type){
        const statement=`        
            SELECT 
                c.id commentId,c.content content,c.comment_id replyId,DATE_FORMAT(c.updateAt, '%Y-%m-%d %H:%i:%s' ) updateAt,
                JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url) author,
                (SELECT COUNT(*) FROM comment c1 WHERE c1.comment_id=c.id) replyCount
            FROM comment c
            LEFT JOIN user u ON c.user_id=u.id
            WHERE c.${type}=? ${type==='article_id'?'AND ISNULL(c.comment_id)':''}
            ORDER BY c.updateAt DESC
            LIMIT ?,?`
        const [res]=await connection.execute(statement,[value,offset,size])
        return res
    }
    async getSingleComment_c(comment_id){
        const statement=`
            SELECT 
                c.id commentId,c.content content,c.comment_id replyId,DATE_FORMAT(c.updateAt, '%Y-%m-%d %H:%i:%s' ) updateAt,
                JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url) author,
                (SELECT COUNT(*) FROM comment c1 WHERE c1.comment_id=c.id) replyCount
            FROM comment c
            LEFT JOIN user u ON c.user_id=u.id
            WHERE c.id=?`
        const [res]=await connection.execute(statement,[comment_id])
        return res
    }
}

module.exports = new CommentService()