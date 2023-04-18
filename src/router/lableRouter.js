const Router=require('koa-router')

const authMiddleWare=require('../middleware/authMiddleWare')
const lableController=require('../controller/lableController')

const lableRouter=new Router({prefix:'/lable'})

lableRouter.post('/addLable',authMiddleWare.verifyAuth,lableController.addLable_c)
lableRouter.get('/getLableList',authMiddleWare.verifyAuth,lableController.getLableList_c)
lableRouter.delete('/deleteLable',authMiddleWare.verifyAuth,lableController.delLable_c)
lableRouter.get('/getAllLables',lableController.getAllLables_c)

module.exports=lableRouter