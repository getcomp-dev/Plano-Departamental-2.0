const express = require('express'),
    router = require('express').Router(),
    exec = require('child_process').exec

router.post('/', function(req, res, next){
    console.log('\nRequest de '+req.usuario.nome+'\n')

    var child = exec('mysql -u root plano_dev < novoPlano.sql', (error, stdout, stderr) => {
        if(error==null){
            res.send({
                success:true,
                message: "Dados Limpados"
            })
        }else{
            res.send({
                success: false,
                error:error,
                stdout: stdout,
                stderr: stderr
            })
        }
    })
})

module.exports = router