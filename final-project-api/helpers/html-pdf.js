const fs = require ('fs')
const handlebars = require ('handlebars')
const pdf = require('html-pdf')

module.exports= {                           
    pdfcreate: (html, replacements,options,cb) => {
        fs.readFile(html, {encoding:'utf-8'}, (err,readHTML) => {
            if(err){
                console.log(err)
                return false
            }else{
                var template = handlebars.compile(readHTML) //baca file html yang setelah itu di compile ke handlebars
                var HtmlToPdf = template(replacements)// abis di compile, dimasukkin ke template, hasilnya adalah string panjang beserta html code file html tadi

                pdf.create(HtmlToPdf, options).toStream((err,stream) => {
                    if (err){
                        console.log(err)
                        return cb(stream)
                    }else{
                        return cb(stream)
                    }
                })
            }
        })
    }
}
