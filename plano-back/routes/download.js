const express = require('express'),
      router = require('express').Router(),
      JSZip = require('jszip'),
      fs = require('fs'),
      mysqldump = require('mysqldump')


router.get('/', function(req, res, next){
    const zip = new JSZip
    console.log('Iniciando PDF')


        console.log('Lendo Tabela')
        let tabela = fs.readFileSync('./tabelaPrincipal.xlsx', (err, data) => {
            if(err) throw err
            return data
        })
        console.log('Tabela Lida')
        zip.file("Tabelas.xlsx", tabela)
        console.log('Tabela adicionada ao zip')
        let carga = fs.readFileSync('./Cargas.pdf', (err, data) => {
            if(err) throw err
            return data
        })
        zip.file("Cargas.pdf", carga)
        console.log('pdf adicionado ao .zip')
        let labs = fs.readFileSync('./Labs.pdf', (err, data) => {
            if(err) throw err
            return data
        })
        zip.file("Labs.pdf", labs)
        console.log('pdf adicionado ao .zip')
        let horarios = fs.readFileSync('./Horarios.pdf', (err, data) => {
            if(err) throw err
            return data
        })
        zip.file("Horarios.pdf", horarios)
        console.log('pdf adicionado ao .zip')

        let plano = fs.readFileSync('./Plano-departamental.pdf', (err, data) => {
            if(err) throw err
            return data
        })
        zip.file("Plano-departamental.pdf", plano)
        console.log('pdf adicionado ao .zip')

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
                    database: 'mult_planos',
                },dumpToFile: './backup.sql',
            }
        ).then(() => {
            console.log('dump criado')
            let sql = fs.readFileSync('./backup.sql', (err, data) => {
                if (err) throw err
                return data
            })
            console.log('sql lido')
            zip.file("backup.sql", sql)
            console.log('sql adicionado')
            zip.generateAsync({type: "uint8array"})
                .then(function (r) {
                    fs.writeFileSync('data.zip', r);
                });
            res.send({success: true})
        }).catch((e)=>{res.send({success:false})})

})

router.get('/createTurmasCursosZip', async function(req, res, next){
    const zip = new JSZip()
    let filenames = fs.readdirSync('/home/planodcc/Plano-Departamental-2.0/plano-back/TurmasCursos')
    filenames.forEach((f) => {
        let pdf = fs.readFileSync(`./TurmasCursos/${f}`, (err, data) => {
            if(err) throw err
            return data
        })
        zip.file(f, pdf)
    })
    setTimeout(await zip.generateAsync({type: "uint8array"})
        .then(function (r) {
            fs.writeFileSync('TurmasCursos.zip', r)
            res.send({success: true})
        }), 500
    )

})

router.get('/downloadTurmasCursosZip', function(req, res, next){
    res.download('./TurmasCursos.zip', 'TurmasCursos.zip')
})

router.get('/all', function(req, res, next){
    res.download('./data.zip', 'data.zip')
})

module.exports = router