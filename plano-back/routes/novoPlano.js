const express = require('express'),
    router = require('express').Router(),
    fs = require('fs'),
    models = require('../models/index'),
    exec = require('child_process').exec

router.post('/', function(req, res, next){
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