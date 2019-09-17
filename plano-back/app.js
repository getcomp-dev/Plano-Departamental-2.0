const express = require('express'),
  cors = require('cors'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  jwt = require('express-jwt'),
  staticFileMiddleware = express.static('public');
  history = require('connect-history-api-fallback'),
  config = require('./config/index'),
  ValidationErrors = require('./library/ValidationError'),
  SequelizeValidationError = require('./models/index').Sequelize.ValidationError,
  authenticateRoute = require('./routes/authenticate'),
  usuarioRoute = require('./routes/usuario'),
  perfilRoute = require('./routes/perfil'),
  cursoRoute = require('./routes/curso'),
  disciplinaRoute = require('./routes/disciplina'),
  pedidoRoute = require('./routes/pedido'),
  pedidoExternoRoute = require('./routes/pedidoExterno'),
  docenteRoute = require('./routes/docente'),
  docentePerfilRoute = require('./routes/docentePerfil'),
  gradeRoute = require('./routes/grade'),
  disciplinaGradeRoute = require('./routes/disciplinaGrade'),
  turmaRoute = require('./routes/turma'),
  turmaExternaRoute = require('./routes/turmaExterna'),
  salaRoute = require('./routes/sala'),
  horarioRoute = require('./routes/horario'),
  vagaRoute = require('./routes/vaga'),
  bddumpRoute = require('./routes/bddump'),
  cargaPosRoute = require('./routes/cargaPos'),
  planoRoute = require('./routes/plano'),
  xlsxDownload = require('./routes/xlsx'),
  pdfsRoute = require('./routes/pdfs'),
  downloads = require('./routes/download'),
  novoPlanoRoute = require('./routes/novoPlano')


const app = express()

app.use(express.static('public'));

//Allow cors
app.use(cors())

//Form handlers
app.use(bodyParser.urlencoded({extended: true, limit:'50mb'}))
app.use(bodyParser.json({limit:'50mb'}))

//Logger
app.use(logger('dev'))

app.use('/api', jwt({secret: config.jwt.secret, requestProperty: 'usuario'}).unless({
  path: [{
    url: '/api/authenticate', methods: ['POST']
  }, {
    url: '/api/usuario', methods: ['POST']
  }]
}))

//Mapping routes
app.use('/api/authenticate', authenticateRoute)
app.use('/api/usuario', usuarioRoute)
app.use('/api/perfil', perfilRoute)
app.use('/api/curso', cursoRoute)
app.use('/api/disciplina', disciplinaRoute)
app.use('/api/pedido', pedidoRoute)
app.use('/api/pedidoExterno', pedidoExternoRoute)
app.use('/api/docente', docenteRoute)
app.use('/api/docentePerfil', docentePerfilRoute)
app.use('/api/disciplinaGrade', disciplinaGradeRoute)
app.use('/api/grade', gradeRoute)
app.use('/api/turma', turmaRoute)
app.use('/api/turmaExterna', turmaExternaRoute)
app.use('/api/sala', salaRoute)
app.use('/api/horario', horarioRoute)
app.use('/api/vaga', vagaRoute)
app.use('/api/bddump', bddumpRoute)
app.use('/api/cargaPos', cargaPosRoute)
app.use('/api/plano', planoRoute)
app.use('/api/xlsx', xlsxDownload)
app.use('/api/pdf', pdfsRoute)
app.use('/api/download', downloads)
app.use('/api/novoPlano', novoPlanoRoute)

app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);
// Error handlers
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

//Catch Validation Errors
app.use(function (err, req, res, next) {
  if (err instanceof ValidationErrors || err instanceof SequelizeValidationError) {
    res.status(err.status || 400)

    if (err instanceof SequelizeValidationError) {
      let fullMessage = ''
      let errors = []
      err.errors.forEach(function (error) {
        errors.push({'field': error.path, 'message': error.message})
        fullMessage += error.message + '\n'
      })

      res.send({success: false, status: err.status, message: 'Validation errors ocurred', errors: errors, fullMessage: fullMessage})
    } else {
      res.send({success: false, status: err.status, message: err.message, data: err.data})
    }

  } else {
    next(err)
  }
})

// Catch 500 and forward to error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  if (app.get('env') === 'development') {
    res.send({success: false, status: err.status, message: err.message, error: err})
  } else {
    res.send({success: false, status: err.status, message: err.message})
  }
})

module.exports = app