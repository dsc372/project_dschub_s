const jwt=require('jsonwebtoken')

const errorType=require('../contants/errorType')
const config=require('../app/config')
const permissionService=require('../service/permissionService')

const verifyAuth=async (ctx,next)=>{
    try {
        const authorization=ctx.headers.authorization
        const token=authorization.replace('Bearer ','')
        const res=jwt.verify(token,config.PUBLIC_KEY,{
            algorithms:'RS256'
        })
        ctx.user=res
        await next()
    } catch (err) {
        const error=new Error(errorType.UNAUTHORIZED)
        return ctx.app.emit('error',error,ctx)
    }
}
const verifyPermission=async(ctx,next)=>{
    let [key]=Object.keys(ctx.params)
    const tableName=key.replace('Id','')
    const user_id=ctx.user.id
    const id=ctx.params[key]

    const isPermission=await permissionService.checkPermission(tableName,user_id,id)

    if(!isPermission){
        const error=new Error(errorType.NO_PERMISSION)
        return ctx.app.emit('error',error,ctx)
    }

    await next()
}

module.exports={
    verifyAuth,
    verifyPermission
}