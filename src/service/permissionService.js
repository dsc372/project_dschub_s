const connection=require('../app/database')

class PermissionService{
    async checkPermission(tableName,user_id,id){
        const statement=`SELECT * FROM ${tableName} WHERE id=? AND user_id=?`
        const [res]=await connection.execute(statement,[id,user_id])
        return res.length
    }
}

module.exports=new PermissionService()