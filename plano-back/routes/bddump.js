const router = require('express').Router(),
      fs = require('fs'),
      mysqldump = require('mysqldump'),
      exec = require('child_process').exec

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
    res.send({success:true})
})

router.post('/:filename([A-Za-z0-9_]+)', function(req, res, next){
   exec('mysql -u root plano_dev < drop_all.sql', (error, stdout, stderr) => {
       if(error == null){
           exec('mysql -u root plano_dev < ' + req.params.filename + '.sql', (error, stdout, stderr) => {
               if(error==null){
                   res.send({
                       success:true,
                       message: "Backup Finalizado"
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
       } else {
           res.send({
               success: false,
               error:error,
               stdout: stdout,
               stderr: stderr
           })
       }
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

router.get('/:filename([A-Za-z0-9_]+)', function(req, res, next){
    var file = '/home/planodcc/Plano-Departamental-2.0/plano-back/' + req.params.filename + '.sql'
    res.download(file)
})

module.exports = router