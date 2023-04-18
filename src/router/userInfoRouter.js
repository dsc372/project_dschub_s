const Router=require('koa-router')

const authMiddleWare=require('../middleware/authMiddleWare')
const userInfoController=require('../controller/userInfoController')

const userInfoRouter=new Router({prefix:'/user'})

userInfoRouter.get('/getUserInfo',authMiddleWare.verifyAuth,userInfoController.getUserInfo_c)
userInfoRouter.patch('/updateUserName',authMiddleWare.verifyAuth,userInfoController.updateUserNameById_c)
userInfoRouter.get('/getUserAvatar/:user_id',userInfoController.getUserAvatar_c)


module.exports=userInfoRouter