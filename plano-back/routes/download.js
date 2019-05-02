const express = require('express'),
      router = require('express').Router(),
      JSZip = require('jszip'),
      fs = require('fs'),
      mysqldump = require('mysqldump')

router.get('/', function(req, res, next){
    const zip = new JSZip
    let tabela = fs.readFileSync('./tabelaPrincipal.xlsx', (err, data) => {
        if(err) throw err
        return data
    })
    zip.file("Tabelas.xlsx", tabela)

    fs.open('backup.sql', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    })
    mysqldump({
            connection: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'plano_dev',
            },dumpToFile: './backup.sql',
        }
    )
    let sql = fs.readFileSync('../backup.sql', (err, data) => {
        if(err) throw err
        return data
    })
    zip.file("backup.sql", sql)
    zip.generateAsync({type:"blob"})
        .then(function (blob) {
            saveAs(blob, "data.zip");
        });
})

module.exports = router