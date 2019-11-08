let multer = require('multer')
let crypto = require("crypto")
let moment = require("moment")

let multerStorageConfig =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/products')
    },

    filename: (req, file, cb) => {
        if(file.mimetype.split('/')[1] == 'jpeg'){
            cb(null, `${moment(Date.now()).format("DDMMYYYYHHmmss")}-${crypto.randomBytes(4).toString("hex")}.jpg`)
        } else {
            cb(null, `${moment(Date.now()).format("DDMMYYYYHHmmss")}-${crypto.randomBytes(4).toString("hex")}.${file.mimetype.split('/')[1]}`)
        }
    }
})

let fileFilterConfig = (req, file, cb) => {
    if (file.mimetype.split('/')[1] == 'jpeg' || file.mimetype.split('/')[1] == 'png'){
        cb(null, true)
    } else {
        req.validation = {
            error: true,
            msg: 'File must be an image'
        }
        cb(null, false)
    }
}

let uploadProduct = multer({
    storage: multerStorageConfig,
    fileFilter: fileFilterConfig
})

module.exports = uploadProduct