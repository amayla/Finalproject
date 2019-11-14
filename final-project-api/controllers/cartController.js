const db = require ('../database')

module.exports={
    addToCart:(req,res) => {
        let sql = `insert into carts (user_id, product_id, product_qty) VALUES (${req.body.user_id},${req.body.product_id},${req.body.product_qty})`
        db.query(sql, (err, result) => {
            if (err) throw err
          
            res.send({
                status: 200,
                results: result
            })
            
        })
    },

    getCart:(req,res) => {
        let sql = `select * from carts as c join products as p on c.product_id=p.product_id`
        if(req.query.user_id || req.query.product_id){
            sql += ` where`
            if(req.query.user_id){
                sql += ` c.user_id = ${req.query.user_id} and`
            } 
            if(req.query.product_id){
                sql += ` p.product_id=${req.query.product_id} and`
            } 
            sql = sql.slice(0, -4)
        }


        console.log(sql)
        db.query(sql, (err, result) => {
            if (err) throw err
            console.log(result)
           
                res.send({
                    status: 200,
                    results: result
                })
           
        })
    },
    
    updateCart:(req,res) => {
        let sql = `update carts set product_qty=${req.body.product_qty} WHERE cart_id=${req.body.cart_id}` 
        db.query(sql, (err, result) => {
            if (err) throw err
           
                res.send({
                    status: 200,
                    results: result
                })
           
        })
    },
    deleteCart:(req,res) => {
        let sql = `DELETE FROM carts WHERE cart_id=${req.body.cart_id}` 
        db.query(sql, (err, result) => {
            if (err) throw err
           
                res.send({
                    status: 200,
                    results: result
                })
           
        })
    }

}