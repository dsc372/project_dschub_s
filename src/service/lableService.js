const connection = require("../app/database")

class LableService{
    async addLable_s(user_id,name){
        const statement=`INSERT INTO lable (user_id,name) VALUES (?,?)`
        await connection.execute(statement,[user_id,name])
    }
    async getLableList_s(user_id){
        const statement=`SELECT name FROM lable WHERE user_id=?`
        let [res]=await connection.execute(statement,[user_id])
        res=res.map(item =>{
            return item.name
        });
        return res
    }
    async delLable_s(user_id,name){
        const statement=`DELETE FROM lable WHERE user_id=? AND name=?`
        await connection.execute(statement,[user_id,name])
    }
}

module.exports=new LableService()