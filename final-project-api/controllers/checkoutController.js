const db = require ('../database')



module.exports={
    updateStockOffline: (req,res) => {
        let sql1 =  `select * from stocks where product_id=${req.body.product_id}`
        db.query(sql1, (err,result) => {
            console.log(result)
            let sql2 = `update stocks set stock_offline =  (${result[0].stock_online} - ${req.body.product_qty})
            where product_id = ${req.body.product_id}`

            if (err) throw err
            db.query(sql2, (err2,result2) => {

                if (err2) throw err2
               
                res.send({
                    status: 200,
                    results: result2
                })
    
            })

        })

      
    },
    updateStock: (req,res) => {
        let sql1 =  `select * from stocks where product_id=${req.body.product_id}`
        db.query(sql1, (err,result) => {
            console.log(result)
            let sql2 = `update stocks set stock_online =  (${result[0].stock_online} - ${req.body.product_qty})
            where product_id = ${req.body.product_id}`

            if (err) throw err
            db.query(sql2, (err2,result2) => {

                if (err2) throw err2
               
                res.send({
                    status: 200,
                    results: result2
                })
    
            })

        })

      
    },
    returnStock: (req,res) => {
        let sql1 =  `select * from stocks where product_id=${req.body.product_id}`
        db.query(sql1, (err,result) => {
            console.log(result)
            let sql2 = `update stocks set stock_online =  (${result[0].stock_online} + ${req.body.product_qty})
            where product_id = ${req.body.product_id}`

            if (err) throw err
            db.query(sql2, (err2,result2) => {

                if (err2) throw err2
               
                res.send({
                    status: 200,
                    results: result2
                })
    
            })

        })

      
    },
    cartCheckout:(req,res) => {
        let sql = `delete from carts where user_id=${req.body.user_id}` 
        db.query(sql, (err, result) => {

            
            if (err) throw err
           
                res.send({
                    status: 200,
                    results: result
                })
           
        })
    }

}

//axios get pakai params, di endpoints req.query
//axios.get atau axios.delete atau axios.patch, yang pakai (/) setelah link endpointsnya pakai req.params. namun di routernya harus pakai /:id
// axios post di endpoints pakai req.body
//axios delete, klo front end nya pakai body ; params nya diganti data
// kalo nge get, keluaran result nya berbentuk array
//kalo ngepost, keluaran result nya berbentuk object