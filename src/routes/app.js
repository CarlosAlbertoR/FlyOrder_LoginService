const express = require('express');
const passport = require('passport');

const index = require('../controller/mainRoute');
const client = require('../controller/client');
const establishment = require('../controller/establishment');
const auth = require('../middlewares/auth');

const app = express.Router();

app.get('/', index.index);

app.get('/listClients', client.getClients);
app.get('/client/:clientId', client.getClient);
app.put('/client/:clientId', client.updateClient);
app.delete('/client/:clientId', client.deleteClient);
app.post('/client/search', client.search);
app.get('/error', client.error);

app.get('/listEstablishments', establishment.getEstablishments);
app.get('/establishment/:establishmentId', establishment.getEstablishment);
app.put('/establishment/:establishmentId', establishment.updateEstablishment);
app.delete('/establishment/:establishmentId', establishment.deleteEstablishment);
app.post('/establishment/search', establishment.search);
app.get('/error', client.error);

app.post('/signupClient', passport.authenticate('local-signup-client', {
    successRedirect: '/listClients',
    failureRedirect: '/error',
    passReqToCallback: true
}));

app.post('/signinClient', passport.authenticate('local-signin-client', {
    successRedirect: '/listClients',
    failureRedirect: '/error',
    passReqToCallback: false
}));

app.post('/signupEstablishment', passport.authenticate('local-signup-establishment', {
    successRedirect: '/listEstablishments',
    failureRedirect: '/error',
    passReqToCallback: true
}));

app.post('/signinEstablishment', passport.authenticate('local-signin-establishment', {
    successRedirect: '/listEstablishments',
    failureRedirect: '/error',
    passReqToCallback: false
}));

module.exports = app;