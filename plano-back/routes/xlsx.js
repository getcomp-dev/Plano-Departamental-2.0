const router = require('express').Router(),
    fs = require('fs'),
    XLSX = require('xlsx')

router.post('/', function(req, res, next){
    var wb = XLSX.utils.book_new();
    console.log(req.body)
    var ws1 = try{XLSX.utils.table_to_sheet(req.body.table)}
              catch(error){console.log(error)}
    XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");
    XLSX.writeFile(wb, 'tabelaPrincipal.xlsx')
    res.download('tabelaPrincipal.xlsx')
})

module.exports = router