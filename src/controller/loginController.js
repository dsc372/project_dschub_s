const jwt=require('jsonwebtoken')

const config=require('../app/config')
const errorType=require('../contants/errorType')
const {VERIFICATION_CODE}=require('../contants/verificationCode')
const userService=require('../service/userService')

class LoginController {
    async login_c(ctx,next){
        const {phone,verificationCode}=ctx.request.body

        if(!phone||phone.length!==11){
            const error=new Error(errorType.PHONE_IS_ERROR)
            return ctx.app.emit('error',error,ctx)
        }
        if(verificationCode!==VERIFICATION_CODE){
            const error=new Error(errorType.VERIFICATION_CODE_IS_ERROR)
            return ctx.app.emit('error',error,ctx)
        }

        let res=await userService.getUserInfo_s(phone,'phone')
        if(res.length===0){
            res=await userService.createUser_s(phone)
        }
        const token=jwt.sign(res,config.PRIVATE_KEY,{
            expiresIn:60*60*24,
            algorithm:'RS256',
        })
        ctx.body={
            id:res.id,
            token
        }
    }
}

module.exports=new LoginController()