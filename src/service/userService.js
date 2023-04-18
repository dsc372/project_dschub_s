const connection=require('../app/database')
const allLables=require("../contants/allLables")
const lableService=require('../service/lableService')
const fileService = require('./fileService')
const config=require('../app/config')

class UserService{
    async createUser_s(phone){
        
        let userName='用户'+phone

        const statement=`INSERT INTO user (phone,name) VALUES (?,?);`
        await connection.execute(statement,[phone,userName])
        const res=await this.getUserInfo_s(phone,'phone')

        for(let i=0;i<8;i++){
            await lableService.addLable_s(res.id,allLables[i]) 
        }

        await fileService.insertAvatar_s(res.id)
        
        await this.updateUserAvatarById_s(res.id)

        return res
    }
    async getUserInfo_s(value,type){
        const statement=`						
            SELECT u.id id,u.name name,u.phone phone,u.avatar_url avatar_url ,
                (SELECT COUNT(*) FROM article a WHERE a.user_id=u.id) articleCount,
                (SELECT COUNT(*) FROM likeArticle l WHERE l.user_id=u.id) likeCount
            FROM user u
            WHERE ${type}=?;`
        const [res]=await connection.execute(statement,[value])
        return res.length===0?[]:res[0]
    }
    async updateUserNameById_s(newName,id){
        const statement=`UPDATE user SET name=? WHERE id=?;`
        await connection.execute(statement,[newName,id])
        return newName
    }
    async updateUserAvatarById_s(id){
        const avatar_url=`${config.APP_HOST}:${config.APP_PORT}/user/getUserAvatar/${id}`
        const statement=`UPDATE user SET avatar_url=? WHERE id=?;`
        await connection.execute(statement,[avatar_url,id])
    }
}

module.exports=new UserService()