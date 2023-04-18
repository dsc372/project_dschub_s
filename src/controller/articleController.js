const fs=require('fs')

const errorType=require('../contants/errorType')
const lengthConfig=require('../contants/lengthConfig')
const articleSevice=require('../service/articleService')
const fileService=require('../service/fileService')
const {PICTURE_PATH}=require('../contants/filePath')

class ArticleController{
    async createArticle_c(ctx,next){
        const userId=ctx.user.id
        const {title,content,lable}=ctx.request.body
        if(title.length>lengthConfig.ARTICLE_TITLE){
            const error=new Error(errorType.ARTICLE_TITLE_IS_TOO_LONG)
            return ctx.app.emit('error',error,ctx)
        }
        if(content.length>lengthConfig.ARTICLE_CONTENT){
            const error=new Error(errorType.ARTICLE_CONTENT_IS_TOO_LONG)
            return ctx.app.emit('error',error,ctx)
        }

        const articleId=await articleSevice.createArticle_s(userId,title,content,lable)

        ctx.body={
            articleId
        }
    }
    async getArticleDetail_c(ctx,next){
        const articleId=ctx.params.articleId
        const userId=ctx.user.id
        
        const res=await articleSevice.getArticleDetail_s(articleId,userId)

        ctx.body={
            articleDetail:res
        }
    }
    async getArticleListByLable_c(ctx,next){
        const{offset,size,lable}=ctx.query
        const res=await articleSevice.getArticleList_s(offset,size,lable,'lable')

        ctx.body={
            articleList:res
        }
    }
    async getArticleListByUserId_c(ctx,next){
        const{offset,size}=ctx.query
        const userId=ctx.user.id
        const res=await articleSevice.getArticleList_s(offset,size,userId,'user_id')

        ctx.body={
            articleList:res
        }
    }
    async deleteArticle_c(ctx,next){
        const {articleId}=ctx.params

        const pictures=await articleSevice.getAriclePic_s(articleId)
        pictures.forEach(element => {
            fs.rmSync(`${PICTURE_PATH}/${element.filename}`)
        });

        await articleSevice.deleteArticle_s(articleId)
        ctx.body='文章删除成功'
    }
    async getPicture_c(ctx,next){
        const {filename}=ctx.params
        const picInfo=await fileService.getPicture_s(filename)
        ctx.response.set('content-type',picInfo.mimetype)
        ctx.body=fs.createReadStream(`${PICTURE_PATH}/${picInfo.filename}`)
    }
    async addArticleLike_c(ctx,next){
        const {articleId}=ctx.request.body
        const userId=ctx.user.id
        articleSevice.addArticleLike_s(articleId,userId)
        ctx.body='点赞成功'
    }
    async delArticleLike_c(ctx,next){
        const {articleId}=ctx.params
        const userId=ctx.user.id
        articleSevice.delArticleLike_s(articleId,userId)
        ctx.body='取消点赞成功'
    }
    async getgetArticleListByLike_c(ctx,next){
        const{offset,size}=ctx.query
        const userId=ctx.user.id
        const res=await articleSevice.getLikeArticle_s(userId,offset,size)
        ctx.body={
            articleList:res
        }
    }
}

module.exports=new ArticleController()
