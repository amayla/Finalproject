const db = require ('../database')



module.exports={
    updateStock: (req,res) => {
        let sql2 = `update products set product_stock = (select product_qty from carts where product_id = ${req.query.id}) - ${req.body.id} where product_id = ${req.query.id})`
        db.query(sql2, (err,result) => {

            if (err) throw err
           
            res.send({
                status: 200,
                results: result
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