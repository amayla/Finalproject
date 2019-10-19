const db = require('../database')

module.exports = {
    getProduct: (req, res) => {
        db.query(`select * from products`, (err, result) => {
            if (err) throw err
            if (result.length > 0){
                let data = result.map(val => {
                    return {
                        userId :val.userId,
                        product_id: val.product_id,
                        product_name: val.product_name,
                        product_desc: val.product_desc,
                        product_price: val.product_price,
                        product_picture: val.product_image,
                        product_stock: val.product_stock,
                        product_category: val.product_category,
                    }
                })
                
                res.send({
                    status: 200,
                    results: data
                })
            } else {
                res.send({
                    status: 404,
                    message: 'Data not found'
                })
            }
        })

    },

    getProductDetail: (req, res) => {
        let sql = `select * from products where product_id = ${req.params.id}`
        

        db.query(sql, (err,result) => {
             
                if (err) throw err
                if (result.length > 0){
                    let data = {
                        product_id : result[0].product_id,
                        product_name : result[0].product_name,
                        product_desc: result[0].product_desc,
                        product_price : result[0].product_price,
                        product_picture: result[0].product_image,
                        product_stock : result[0].product_stock,
                        product_category : result[0].product_category
                        
                        
                    }
                    
                    res.send({
                        status: 200,
                        results: [data]
                    })
                } else {
                    res.send({
                        status: 404,
                        message: 'Data not found'
                    })
                }
            
        })
    }


}