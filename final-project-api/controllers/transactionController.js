const db = require('../database')
const fs = require('fs')

module.exports={
    getTransaction: (req,res) => {
        let sql = `select * from transaction`
        db.query(sql, (err,result)=>{
            if (err) throw err
            res.send({
                results: result
            })
        })
    },
    getTransactionbyId : ( req,res ) => {
        let sql = `select * from transaction join transaction_details on transaction.transaction_id = transaction_details.transaction_id where transaction.transaction_id=${req.params.id}`
        
        db.query(sql, (err,result) => {
            if (err) throw err
            
            let data = []
            let iterator = 0

            for (let i = 0; i < result.length; i++) {
                if (i == 0){
                    data.push({
                        transaction_id: result[0].transaction_id,
                        user_id: result[0].user_id,
                        recipient_address: result[0].recipient_address,
                        recipient_phone: result[0].recipient_phone,
                        recipient_name: result[0].recipient_name,
                        recipient_province: result[0].recipient_province,
                        recipient_city: result[0].recipient_city,
                        recipient_pcode: result[0].recipient_pcode,
                        recipient_note: result[0].recipient_note,
                        transaction_date: result[0].transaction_date,
                        transaction_details: [{
                            transaction_details_id: result[0].transaction_details_id,
                            transaction_id: result[0].transaction_id,
                            user_id: result[0].user_id,
                            product_id: result[0].product_id,
                            product_name: result[0].product_name,
                            product_price: result[0].product_price,
                            product_qty: result[0].product_qty,
                            total_price: result[0].total_price,
                            
                        }]
                    })
                    iterator++
                    continue
                }

                if (result[i].transaction_id == result[i-1].transaction_id){
                    data[iterator - 1].transaction_details.push({
                        transaction_details_id: result[i].transaction_details_id,
                        transaction_id: result[i].transaction_id,
                        user_id: result[i].user_id,
                        product_id: result[i].product_id,
                        product_name: result[i].product_name,
                        product_price: result[i].product_price,
                        product_qty: result[i].product_qty,
                        total_price: result[i].total_price,
                    })
                } else {
                    data.push({
                        transaction_id: result[i].transaction_id,
                        user_id: result[i].user_id,
                        recipient_address: result[i].recipient_address,
                        recipient_phone: result[i].recipient_phone,
                        recipient_name: result[i].recipient_name,
                        recipient_note: result[i].recipient_note,
                        transaction_date: result[i].transaction_date,
                        transaction_details: [{
                            transaction_details_id: result[i].transaction_details_id,
                            transaction_id: result[i].transaction_id,
                            user_id: result[i].user_id,
                            product_id: result[i].product_id,
                            product_name: result[i].product_name,
                            product_price: result[i].product_price,
                            product_qty: result[i].product_qty,
                            total_price: result[i].total_price,
                            
                        }]
                    })
                    iterator++
                }
            }

            if (result.length > 0){          
                res.send({
                    status: 200,
                    results: data
                })
            } else {
                res.send({
                    status: 404,
                    message: 'Data not found',
                    results: result
                })
            }
        })
    },

    addToTransaction:(req,res) => {
        let carts = req.body.carts
        
        let sql = `insert into transaction (transaction_id, user_id, recipient_address,recipient_phone,
                    transaction_date,recipient_name,recipient_note,recipient_province,recipient_city, 
                    recipient_pcode) 
                values (
                    0,
                    ${req.body.user_id},
                    '${req.body.recipient_address}',
                    '${req.body.recipient_phone}',
                    '${req.body.transaction_date}',
                    '${req.body.recipient_name}',
                    '${req.body.recipient_note}',
                    '${req.body.recipient_province}',
                    '${req.body.recipient_city}',
                    ${req.body.recipient_pcode})`
        
        
            db.query(sql, (err,result)=>{
                if (err) throw err
                res.send({
                    results: result
                })

           
                for (let i = 0; i < carts.length ; i++){
                    db.query(`insert into transaction_details ( transaction_details_id, user_id, transaction_id, product_id, product_name, product_price,product_qty,total_price) 
                    
                    values (
                        0,
                        ${carts[i].user_id},
                        ${result.insertId},
                        ${carts[i].product_id},
                        '${carts[i].product_name}',
                        ${carts[i].product_price},
                        ${carts[i].product_qty},
                        ${carts[i].product_price*carts[i].product_qty})` )
                }    
        })   
    
    },

    updateTransaction: (req, res) => {
        let sql = `update transaction set transaction_status = '${req.body.transaction_status}' where transaction_id = ${req.params.id}`

        db.query(sql, (err, result) => {
            if (err) throw err

            res.send({
                status: 201,
                message: 'Transaction Updated',
                results: result
            })
        })
    },


    addTransferProof: (req, res) => {
        try {
            if(req.validation) throw req.validation
            if(req.file.size > 5000000) throw {error: true, message: 'Image size too large'}

            let data = JSON.parse(req.body.data)
            console.log(data)
            console.log(req.file)
            db.query(
                `update transaction set bank_name = '${data.bank_name}', bank_account_name = '${data.bank_account_name}',
                bank_transfer_proof = '${req.file.filename}' where transaction_id = ${req.params.id}`, (err, result) => {

                try {
                    if (err) throw err
                    res.send({
                        status: 201,
                        message: 'Image uploaded',
                        results: result
                    })
                } catch (error) {
                    // delete file when query/database error
                    fs.unlinkSync(req.file.path)
                    console.log(error)                
                }
            })
        } catch (error) {
            // delete file if file size more than 5MB
            fs.unlinkSync(req.file.path)
            console.log(error)
        }
    }
}