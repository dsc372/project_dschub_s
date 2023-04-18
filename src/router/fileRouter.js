const Router=require('koa-router')

const authMiddleWare=require('../middleware/authMiddleWare')
const fileMiddleWare=require('../middleware/fileMiddleWare')
const fileController=require('../controller/fileController')

const fileRouter=new Router({prefix:'/upload'})


fileRouter.patch('/avatar',authMiddleWare.verifyAuth,fileMiddleWare.avatarHandler,fileController.updateAvatar_c)
fileRouter.post('/picture/:articleId',authMiddleWare.verifyAuth,fileMiddleWare.pictureHandler,fileController.insertAriclePicture_c)

module.exports=fileRouter