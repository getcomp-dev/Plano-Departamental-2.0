const models = require('../models/index'),
    router = require('express').Router(),
    Sequelize = require('sequelize');

router.get('/', function (req, res, next) {
    models.History.findAll({
        where: {
            createdAt: {
              [Sequelize.Op.gt]: req.query.limitDate,
            },
          },
    }).then(function (history) {
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