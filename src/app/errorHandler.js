const errorType=require('../contants/errorType')


const errorHandler=(error,ctx)=>{
    let status, message
    switch(error.message){
        case errorType.PHONE_IS_ERROR:
            status=400
            message='手机号为空或格式错误'
            break
        case errorType.VERIFICATION_CODE_IS_ERROR:
            status=400
            message='验证码错误'
            break
        case errorType.USERNAME_IS_EXISTED:
            status=409//conflict
            message='用户名已存在'
            break
        case errorType.UNAUTHORIZED:
            status=401
            message='登陆已过期，请重新登录'
            break
        case errorType.ARTICLE_CONTENT_IS_TOO_LONG:
            status=400
            message='文章内容过长'
            break
        case errorType.ARTICLE_TITLE_IS_TOO_LONG:
            status=400
            message='文章标题过长'
            break
        case errorType.NO_PERMISSION:
            status=401
            message='无操作权限'
            break
        case errorType.COMMENT_CONTENT_IS_TOO_LONG:
            status=400
            message='评论内容过长'
            break
        default:
            status=404
            message='发生了一些错误'
    }
    ctx.status=status
    ctx.body=message
}

module.exports=errorHandler