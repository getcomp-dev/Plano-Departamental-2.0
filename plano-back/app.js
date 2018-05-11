const express = require('express'),
  cors = require('cors'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  jwt = require('express-jwt'),
  config = require('./config/index'),
  ValidationErrors = require('./library/ValidationError'),
  SequelizeValidationError = require('./models/index').Sequelize.ValidationError,
  authenticateRoute = require('./routes/authenticate'),
  usuarioRoute = require('./routes/usuario'),
  perfilRoute = require('./routes/perfil'),
  cursoRoute = require('./routes/curso')

const app = express()

//Allow cors
app.use(cors())

//Form handlers
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Logger
app.use(logger('dev'))

app.use(jwt({secret: config.jwt.secret, requestProperty: 'usuario'}).unless({
  path: [{
    url: '/authenticate', methods: ['POST']
  }, {
    url: '/usuario', methods: ['POST']
  }]
}))

//Mapping routes
app.use('/authenticate', authenticateRoute)
app.use('/usuario', usuarioRoute)
app.use('/perfil', perfilRoute)
app.use('/curso', cursoRoute)

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