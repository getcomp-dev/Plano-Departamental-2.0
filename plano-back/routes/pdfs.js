const express = require('express'),
      router = require('express').Router(),
      pdfs = require ('../library/pdfs')

router.post('/criarPDFs', async function(req, res, next){
    const pdf = new pdfs
    await pdf.ready({Plano: parseInt(req.body.Plano)})
    res.send({success:true})
})

router.post('/pdfsTurmamsCurso', async function(req, res, next){
    const pdf = new pdfs
    await pdf.TurmasCursos({Plano: parseInt(req.body.Plano), periodo: parseInt(req.body.periodo)})
    res.send({success:true})
})

module.exports = router