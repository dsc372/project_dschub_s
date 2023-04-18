const Router=require('koa-router')

const loginController =require('../controller/loginController')

const loginRouter=new Router()

loginRouter.post('/login',loginController.login_c)


module.exports=loginRouter