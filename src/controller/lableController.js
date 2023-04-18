const lableService=require('../service/lableService')
const allLables=require('../contants/allLables')

class LableController{
    async addLable_c(ctx,next){
        const user_id=ctx.user.id
        const {name}=ctx.request.body
        await lableService.addLable_s(user_id,name)
        ctx.body='标签添加成功'
    }
    async getLableList_c(ctx,next){
        const user_id=ctx.user.id
        const res=await lableService.getLableList_s(user_id)
        ctx.body={
            lableList:res
        }
    }
    async delLable_c(ctx,next){
        const user_id=ctx.user.id
        const {name}=ctx.request.body
        await lableService.delLable_s(user_id,name)
        ctx.body='标签删除成功'
    }
    async getAllLables_c(ctx,next){
        ctx.body={
            allLables
        }
    }
}

module.exports=new LableController()