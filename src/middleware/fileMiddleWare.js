const Multer=require('koa-multer')

const {AVA_PATH,PICTURE_PATH}=require('../contants/filePath')
const avatarUpload=Multer({
    dest:AVA_PATH, 
})
const avatarHandler=avatarUpload.single('avatar')

const pictureUpload=Multer({
    dest:PICTURE_PATH,
})
const pictureHandler=pictureUpload.array('picture',3)


module.exports={
    avatarHandler,
    pictureHandler
}