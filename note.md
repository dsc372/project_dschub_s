1、将所有的配置信息单独抽出到.env文件中，并在app文件夹下的config.js文件中用第三方库dotenv解析到process.env对象中

2、注册前用verify判断注册信息是否合规(用户名或密码不为空，或用户名没有被注册过),有错误用ctx.app.emit(error,ctx)抛出，在app/index.js中监听

bug1:getUserByPhoneOrName时返回res[0]，因为res.length永远会大于0，无法判断用户名是否已存在

bug2:fs.readFileSync相对路径相对的是启动文件夹

bug3:rs256密钥长度要2048

3、算是难点吗？verifyPermission的封装

4、头像的显示，写一个读取图片的url，放在userInfo中返回