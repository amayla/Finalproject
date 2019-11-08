const db = require('../database')
const fs = require('fs')

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
                        product_image: val.product_image,
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
                        product_image: result[0].product_image,
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
    },

    createProduct: (req, res) => {
        

        try {
            if(req.validation) throw req.validation
            if(req.file.size > 5000000) throw {error: true, message: 'Image size too large'}

            let data = JSON.parse(req.body.data)

            console.log(data)
            let sql = `insert into products values (0, '${data.product_name}', '${data.product_desc}',
            '${data.product_price}', '${req.file.filename}', '${data.product_stock}', 'category',
            CURRENT_TIMESTAMP)`
            
            console.log(data)
            console.log(req.file)
            db.query(sql, (err, result) => {

                try {
                    if (err) throw err
                    res.send({
                        status: 201,
                        message: 'Image uploaded',
                        results: result
                    })
                } catch (error) {
                    // delete file when query/database error
                    // fs.unlinkSync(req.file.path)
                    console.log(error)                
                }
            })
        } catch (error) {
            // delete file if file size more than 5MB
            console.log(req.file)
            // fs.unlinkSync(req.file.path)
            console.log(error)
        }
    },

    editProduct: (req, res) => {
        let sql = `update products set product_name = '${req.body.product_name}', product_desc = '${req.body.product_desc}',
        product_price = '${req.body.product_price}', product_image = '${req.body.product_image}', product_stock = '${req.body.product_stock}',
        product_category = '${req.body.product_category}', created_at = CURRENT_TIMESTAMP where product_id = ${req.params.id}`

        db.query(sql, (err,result) => {
             
                if (err) throw err
                res.send({
                    status: 201,
                    results: result
                })
        })
    },
    deleteProduct:(req,res) => {
        let sql = `delete from products where product_id=${req.params.id}` 
        db.query(sql, (err, result) => {

            if (err) throw err
           
                res.send({
                    status: 200,
                    results: result
                })
           
        })
    }


}