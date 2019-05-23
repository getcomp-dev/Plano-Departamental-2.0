const express = require('express'),
      router = require('express').Router(),
      pdfs = require ('../library/pdfs')

router.post('/criarPDFs', function(req, res, next){
    const pdf = new pdfs
    pdf.ready().then((pdfs) => {
        pdfs[0].on('finish', () => {
            pdfs[1].on('finish', () => {
                pdfs[2].on('finish', () => {
                    res.send({success:true})
                })
            })
        })
    })
})

module.exports = router