const errorType=require('../contants/errorType')
const lengthConfig=require('../contants/lengthConfig')
const commentSevice=require('../service/commentService')

class CommentController{
    async createComment_c(ctx,next){
        const {articleId,content}=ctx.request.body
        const {id}=ctx.user

        if(content.length>lengthConfig.COMMENT_CONTENT){
            const error=new Error(errorType.COMMENT_CONTENT_IS_TOO_LONG)
            return ctx.app.emit('error',error,ctx)
        }

        const commentInfo=await commentSevice.createComment_s(id,articleId,content)

        ctx.body={
            commentInfo
        }
    }
    async replyComment_c(ctx,next){
        const {articleId,content}=ctx.request.body
        const {commentId}=ctx.request.params
        const {id}=ctx.user
        if(content.length>lengthConfig.COMMENT_CONTENT){
            const error=new Error(errorType.COMMENT_CONTENT_IS_TOO_LONG)
            return ctx.app.emit('error',error,ctx)
        }

        const commentInfo=await commentSevice.replyComment_s(id,articleId,commentId,content)

        ctx.body={
            commentInfo
        }
    }
    async deleteComment_c(ctx,next){
        const {commentId}=ctx.request.params
        const replyCount=await commentSevice.deleteComment_s(commentId)
        ctx.body={
            replyCount
        }
    }
    async getCommentList_c(ctx,next){
        const {articleId}=ctx.request.params
        const{offset,size}=ctx.query
        const res=await commentSevice.getCommentList_s(offset,size,articleId,'article_id')
        ctx.body={
            comment:res
        }
    }
    async getReplyList_c(ctx,next){
        const {commentId}=ctx.request.params
        const{offset,size}=ctx.query
        const res=await commentSevice.getCommentList_s(offset,size,commentId,'comment_id')
        ctx.body={
            comment:res
        }
    }
}

module.exports=new CommentController()