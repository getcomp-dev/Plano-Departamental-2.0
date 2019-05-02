const express = require('express'),
      router = require('express').Router(),
      JSZip = require('jszip'),
      fs = require('fs'),
      mysqldump = require('mysqldump')

router.get('/', function(req, res, next){
    const zip = new JSZip
    console.log('Lendo Tabela')
    let tabela = fs.readFileSync('./tabelaPrincipal.xlsx', (err, data) => {
        if(err) throw err
        return data
    })
    console.log('Tabela Lida')
    zip.file("Tabelas.xlsx", tabela)
    console.log('Tabela adicionada ao zip')
    console.log('criando sql')
    fs.open('backup.sql', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    })
    console.log('arquivo criado')
    mysqldump({
            connection: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'plano_dev',
            },dumpToFile: './backup.sql',
        }
    )
    console.log('dump criado')
    let sql = fs.readFileSync('./backup.sql', (err, data) => {
        if(err) throw err
        return data
    })
    console.log('sql lido')
    zip.file("backup.sql", sql)
    console.log('sql adicionado')
    zip.generateAsync({type:"blob"})
        .then(function (blob) {
            let zipFile = fs.openSync('data.zip', 'w+')
            fs.writeSync(zipFile, blob, 0, blob.size, 0)
            fs.close(zipFile, (err) => {
                if (err) throw err;
            });
        });
    res.send({success:true})
})

module.exports = router