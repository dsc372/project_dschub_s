const fs=require('fs')

const {AVA_PATH}=require('../contants/filePath')
const userService=require('../service/userService')
const fileService=require('../service/fileService')
const errorType=require('../contants/errorType')

class UserInfoController {
    async getUserInfo_c(ctx,next){
        const {id}=ctx.user

        const userInfo=await userService.getUserInfo_s(id,'id')

        ctx.body={
            userInfo
        }
    }
    async updateUserNameById_c(ctx,next){
        const {id}=ctx.user
        const {newName}=ctx.request.body

        const res=await userService.getUserInfo_s(newName,'name')
        if(res.length!==0){
            const error=new Error(errorType.USERNAME_IS_EXISTED)
            return ctx.app.emit('error',error,ctx)
        }

        await userService.updateUserNameById_s(newName,id)
        ctx.body={
            newName
        }
    }
    async getUserAvatar_c(ctx,next){
        const id=ctx.params.user_id
        const avatarInfo=await fileService.getUserAvatar_s(id)
        ctx.response.set('content-type',avatarInfo.mimetype)
        ctx.body=fs.createReadStream(`${AVA_PATH}/${avatarInfo.filename}`)
    }
}

module.exports=new UserInfoController()