const fs=require('fs')

const fileService=require('../service/fileService')
const {AVA_PATH}=require('../contants/filePath')

class FileController{
    async updateAvatar_c(ctx,next){
        const {mimetype,filename,size}=ctx.req.file
        const user_id=ctx.user.id

        const oldAvatar=await fileService.getUserAvatar_s(user_id)
        if(oldAvatar.filename!=='684a3e10f9d95d1f925d5df7e095014b'){
            fs.rmSync(`${AVA_PATH}/${oldAvatar.filename}`)
        }

        await fileService.uploadAvatar_s(filename,mimetype,size,user_id)

        ctx.body='头像上传成功'
    }
    async insertAriclePicture_c(ctx,next){
        const files=ctx.req.files
        const user_id=ctx.user.id
        const article_id=ctx.params.articleId

        for(let file of files){
            const {mimetype,filename,size}=file
            await fileService.insertArticlePicture_s(filename,mimetype,size,user_id,article_id)
        }
        ctx.body='文章图片上传成功'
    } 
}

module.exports=new FileController()