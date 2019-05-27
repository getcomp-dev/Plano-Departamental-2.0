const express = require('express'),
      router = require('express').Router(),
      pdfs = require ('../library/pdfs')

router.post('/criarPDFs', async function(req, res, next){
    const pdf = new pdfs
    await pdf.ready()
    res.send({success:true})
})

module.exports = router