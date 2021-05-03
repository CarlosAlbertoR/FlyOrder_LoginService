const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const flash = require('connect-flash');
const morgan = require('morgan');
const passport = require('passport');

//Inicializaciones
const app = express();
app.use(cors());
require('./settings/db');
require('./controller/local-auth');

//Configuraciones
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/app'));

//Iniciando el servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port: ', app.get('port'))
});