const Router=require('koa-router')

const authMiddleWare=require('../middleware/authMiddleWare')
const articleController=require('../controller/articleController')

const articleRouter=new Router({prefix:'/article'})

articleRouter.post('/createArticle',authMiddleWare.verifyAuth,articleController.createArticle_c)
articleRouter.get('/getArticleDetail/:articleId',authMiddleWare.verifyAuth,articleController.getArticleDetail_c)
articleRouter.get('/getArticleListByUserId',authMiddleWare.verifyAuth,articleController.getArticleListByUserId_c)
articleRouter.get('/getArticleListByLable',articleController.getArticleListByLable_c)
articleRouter.delete('/deleteArticle/:articleId',authMiddleWare.verifyAuth,authMiddleWare.verifyPermission,articleController.deleteArticle_c)
articleRouter.get('/getPicture/:filename',articleController.getPicture_c)
articleRouter.post('/addArticleLike',authMiddleWare.verifyAuth,articleController.addArticleLike_c)
articleRouter.delete('/delArticleLike/:articleId',authMiddleWare.verifyAuth,articleController.delArticleLike_c)
articleRouter.get('/getArticleListByLike',authMiddleWare.verifyAuth,articleController.getgetArticleListByLike_c)

module.exports=articleRouter