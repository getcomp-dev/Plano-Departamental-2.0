const express = require('express'),
      router = require('express').Router(),
      pdfs = require ('../library/pdfs')

router.post('/criarPDFs', function(req, res, next){
    const pdf = new pdfs
    pdf.ready().then(() => res.send({success:true}))
})

module.exports = router