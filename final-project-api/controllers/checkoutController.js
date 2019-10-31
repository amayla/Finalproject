const db = require ('../database')

module.exports={
    addToTransaction:(req,res) => {
        let carts = req.body.carts
        
        let sql = `insert into transaction (transaction_id, user_id, recipient_address,recipient_phone,transaction_date,recipient_name,recipient_note) 
                values (
                    0,
                    ${req.body.user_id},
                    '${req.body.recipient_address}',
                    '${req.body.recipient_phone}',
                    '${req.body.transaction_date}',
                    '${req.body.recipient_name}',
                    '${req.body.recipient_note}')`
        
        
            db.query(sql, (err,result)=>{
                if (err) throw err
                res.send({
                    results: result
                })

            })
            
                
            for (let i = 0; i < carts.length ; i++){
                db.query(`insert into transaction_details ( transaction_details_id, user_id, transaction_id, product_id, product_name, product_price,product_qty,total_price) 
                
                values (
                    0,
                    ${carts[i].user_id},
                    0,
                    ${carts[i].product_id},
                    '${carts[i].product_name}',
                    ${carts[i].product_price},
                    ${carts[i].product_qty},
                    ${carts[i].product_price*carts[i].product_qty})` )
            }       
    
},

    // addToTransaction:(req,res) => {
    //     let sql = `insert into transaction_details (transaction_details_id, transaction_id, product_name, product_price,product_qty) 
    //             values (
    //                 1,
    //                 ${req.body.user_id},
    //                 ${req.body.transaction_id},
    //                 ${req.body.product_name},
    //                 ${req.body.product_price},
    //                 ${req.body.product_qty})`
        
    //         db.query(sql, (err, result) => {
    //         if (err) throw err
          
    //         res.send({
    //             status: 200,
    //             results: result
    //         })
            
    //     })
    // },

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