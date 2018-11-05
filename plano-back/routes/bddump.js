const router = require('express').Router(),
      fs = require('fs'),
      mysqldump = require('mysqldump'),
      execSync = require('child_process').execSync

router.post('/', function(req, res, next){

    fs.open(req.body.filename + '.sql', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    })
    mysqldump({
                connection: {
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: 'plano_dev',
                },dumpToFile: './'+req.body.filename+'.sql',
            }
        )
    const drop = fs.readFileSync('drop_all.sql')
    const data = fs.readFileSync(req.body.filename + '.sql')
    const fd = fs.openSync(req.body.filename + '.sql', 'w+')
    fs.writeSync(fd, drop, 0, drop.length, 0)
    fs.writeSync(fd, data, 0, data.length, drop.length)
    fs.close(fd, (err) => {
        if (err) throw err;
    });


})

router.post('/:filename([A-Za-z0-9_]+)', function(req, res, next){

   var child = execSync('mysql -u root plano_dev < ' + req.params.filename + '.sql', function() {
       console.log('Backup Carregado!')
   })
})

router.get('/', function(req, res, next){
    var fileNames = fs.readdirSync('/home/planodcc/Plano-Departamental-2.0/plano-back')
        res.send({
            success: true,
            message: "Arquivos Listados",
            Files: fileNames
        })
})

module.exports = router