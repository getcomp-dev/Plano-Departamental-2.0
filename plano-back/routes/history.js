const models = require('../models/index'),
    router = require('express').Router()

router.get('/', function (req, res, next) {
    models.History.findAll().then(function (history) {
        res.send({
            success: true,
            message: 'Logs listados',
            History: history
        })
    }).catch(function (err) {
        return next(err, req, res)
    })
})

module.exports = router