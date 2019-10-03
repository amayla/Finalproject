const db = require('../database')

module.exports = {
    getProduct: (req, res) => {
        db.query(`select * from products`, (err, result) => {
            if (err) throw err
            if (result.length > 0){
                let data = result.map(val => {
                    return {
                        id: val.product_id,
                        name: val.product_name,
                        desc: val.product_desc,
                        price: val.product_price,
                        picture: val.product_image,
                        stock: val.product_stock,
                        category: val.product_category,
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
                        name : result[0].product_name,
                        description: result[0].product_desc,
                        price : result[0].product_price,
                        picture: result[0].product_image,
                        stock : result[0].product_stock,
                        category : result[0].product_category
                        
                        
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