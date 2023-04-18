const Router=require('koa-router')

const authMiddleWare=require('../middleware/authMiddleWare')
const commentController=require('../controller/commentController')

const commentRouter=new Router({prefix:'/comment'})

commentRouter.post('/createComment',authMiddleWare.verifyAuth,commentController.createComment_c)
commentRouter.post('/replyComment/:commentId',authMiddleWare.verifyAuth,commentController.replyComment_c)
commentRouter.delete('/deleteComment/:commentId',authMiddleWare.verifyAuth,authMiddleWare.verifyPermission,commentController.deleteComment_c)
commentRouter.get('/getCommentList/:articleId',authMiddleWare.verifyAuth,commentController.getCommentList_c)
commentRouter.get('/getReplyList/:commentId',authMiddleWare.verifyAuth,commentController.getReplyList_c)


module.exports=commentRouter