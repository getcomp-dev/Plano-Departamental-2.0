const router = require('express').Router(),
    fs = require('fs'),
    XLSX = require('xlsx')

router.post('/', function(req, res, next){
    var wb = XLSX.utils.book_new();
    var ws1 = XLSX.utils.table_to_sheet(req.body.table)
    XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");
    XLSX.writeFile(wb, 'tabelaPrincipal.xlsx')
    res.download('tabelaPrincipal.xlsx')
})

module.exports = router