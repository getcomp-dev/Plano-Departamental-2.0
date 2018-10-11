const router = require('express').Router(),
      fs = require('fs'),
      mysqldump = require('mysqldump'),
      importer = require('node-mysql-importer')

router.post('/', function(req, res, next){
    fs.open(req.body.filename + '.sql', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });
    mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'plano_dev',
        },
        dumpToFile: './' + req.body.filename + '.sql',
    })

})

router.post('/:filename(.+)', function(req, res, next){
    importer.config({
        'host': 'localhost',
        'user': 'root',
        'password': '',
        'database': 'plano_dev'
    })

    importer.importSQL(req.params.filename + '.sql').then( () => {
        console.log('all statements have been executed')
    }).catch( err => {
        console.log(`error: ${err}`)
    })
})

module.exports = router