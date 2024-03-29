const db = require ('../database')

module.exports = {
    getUser: (req, res) => {
        let sql = `select * from users`
        if (req.params.id){
            sql = `${sql} where user_id = ${req.params.id}`
        }
        if (req.query.username){
            sql = `${sql} where username = '${req.query.username}'`
        }
        if (req.query.email){
            sql = `${sql} where email = '${req.query.email}'`
        }

        db.query(sql, (err, result) => {
            if (err) throw err
            if (result.length > 0){
                res.send({
                    status: 200,
                    results: result
                })
            } else {
                res.send({
                    status: 404,
                    message: 'User not found',
                    results: result
                })
            }
        })
    },

    createUser: (req, res) => {
        db.query(`insert into users (id,username, email, password, role, verified) values (0,'${req.body.username}', '${req.body.email}', '${req.body.password}','user',0)`, (err, result) => {
            if (err) throw err
            res.send({
                status: 201,
                message: 'Your account has been created'
            })
        })
    },
    
    loginUser: (req, res) => {
        db.query(`select * from users where username = '${req.query.username}'`, (err, result) => {
            if (err) throw err
            if (result.length > 0){
                if(req.query.password === result[0].password){
                    res.send({
                        status: 200,
                        results: result
                    })
                } else {
                    res.send({
                        status: 401,
                        message: 'Wrong password'
                    })
                }
            } else {
                res.send({
                    status: 404,
                    message: 'Login error'
                })
            }
        })
    }
}