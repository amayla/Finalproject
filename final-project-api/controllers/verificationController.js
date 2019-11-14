const db = require ('../database')
const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
// const fs = require('fs')
// const moment = require('moment')
// const emailSecretKey = require('../configs/emailSecretKey')

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'in.orchidfour@gmail.com',
        pass:'bkmvyezscludbsjf'
    }
})

module.exports = {
    sendVerificationEmail:(req,res) => {
       
        let mailOptions = {
            from: 'Commoditea <in.orchidfour@gmail.com.com>',
            to: req.body.email,
            subject: 'Verify your account',
            html: `<p>To verify your account, please click
            </p><a href='${'http://localhost:1001/'}verifyuser?email=${req.body.email}'>here</a>`
        }
        
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err
        })

        res.send({
            status: 201,
            message: 'Email sent'
        })  
    },
    sendConfirmVerify:(req,res) => {
        let to = req.query.email
        let mailOptions = {
        from:'Commoditea <in.orchidfour@gmail.com>',
        to,
        subject:'Your registration is succeed',
        html:'<h1> Welcome to Commoditea!</h1>'
            }
            if(to){
                transporter.sendMail(mailOptions,(err,info)=>{
                    if (err) throw err
                    res.send('Email Succeed')
                })
            }else{
                res.send('Email Empty')
            }
        

    },
    verifyUser:  (req,res) =>{
           
            let sql = `update users set verified = 1 where email = '${req.query.email}'`
        
            db.query(sql, (err,result)=> {
                if (err) throw err
                res.send('Congratulations, your account is now verified')
            })
        }
        

}