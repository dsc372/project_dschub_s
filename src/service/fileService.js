const connection = require("../app/database")
const {DEFAULT_FILENAME,DEFAULT_MIMETYPE,DEFAULT_SIZE}=require('../contants/defaultAvatar')

class FileService{
    async uploadAvatar_s(filename,mimetype,size,userId){
        const statement=`UPDATE avatar SET filename=?,mimetype=?,size=? WHERE user_id=?`
        await connection.execute(statement,[filename,mimetype,size,userId])
    }
    async insertAvatar_s(userId){
        const statement=`INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)`
        await connection.execute(statement,[DEFAULT_FILENAME,DEFAULT_MIMETYPE,DEFAULT_SIZE,userId])
    }
    async getUserAvatar_s(userId){
        const statement=`SELECT * FROM avatar WHERE user_id=?`
        const [res]=await connection.execute(statement,[userId])
        return res[0]
    }
    async insertArticlePicture_s(filename,mimetype,size,userId,article_id){
        const statement=`INSERT INTO articlePic (filename,mimetype,size,user_id,article_id) VALUES (?,?,?,?,?)`
        await connection.execute(statement,[filename,mimetype,size,userId,article_id])
    }
    async getPicture_s(filename){
        const statement=`SELECT * FROM articlePic WHERE filename=?`
        const [res]=await connection.execute(statement,[filename])
        return res[0]
    }
}

module.exports=new FileService()