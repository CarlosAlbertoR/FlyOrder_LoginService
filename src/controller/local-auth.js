const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const service = require('../services');

const Client = require('../models/local-client');
const Establishment = require('../models/local-establishment');

passport.serializeUser((client, done) => {
    done(null, client.id);
});

passport.serializeUser((establishment, done) => {
    done(null, establishment.id);
});

passport.deserializeUser(async(id, done) => {
    const establishment = await Establishment.findById(id);
    done(null, establishment);
});

passport.deserializeUser(async(id, done) => {
    const client = await Client.findById(id);
    done(null, client);
});

passport.use('local-signup-client', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async(req, email, password, done) => {
    const client = await Client.findOne({ 'email': email })
    console.log(client)
    if (client) {
        return done(null, false, console.log('El usuario ya se encuentra registrado'));
    } else {
        const newClient = new Client();
        newClient.name = req.body.name;
        newClient.address = req.body.address;
        newClient.city = req.body.city;
        newClient.phone = req.body.phone;

        newClient.email = email;
        newClient.password = newClient.encryptPassword(password);
        console.log(newClient);
        await newClient.save();
        done(null, newClient, { token: service.createToken(newClient) });
    }
}));

passport.use('local-signin-client', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const client = await Client.findOne({ email: email });
    if (!client) {
        return done(null, false, console.log('Usuario no encontrado'));
    }
    if (!client.validatePassword(password)) {
        return done(null, false, console.log('Contraseña incorrecta'));
    }
    done(null, client, { token: service.createToken(client) });
}));

passport.use('local-signup-establishment', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async(req, email, password, done) => {
    const establishment = await Establishment.findOne({ 'email': email })
    console.log(establishment)
    if (establishment) {
        return done(null, false, console.log('El usuario ya se encuentra registrado'));
    } else {
        const newEstablishment = new Establishment();
        newEstablishment.name = req.body.name;
        newEstablishment.address = req.body.address;
        newEstablishment.city = req.body.city;
        newEstablishment.phone = req.body.phone;
        newEstablishment.NIT = req.body.NIT;
        newEstablishment.nameAdmin = req.body.nameAdmin;

        newEstablishment.email = email;
        newEstablishment.password = newEstablishment.encryptPassword(password);
        console.log(newEstablishment);
        await newEstablishment.save();
        done(null, newEstablishment, { token: service.createToken(newEstablishment) });
    }
}));

passport.use('local-signin-establishment', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const establishment = await Establishment.findOne({ email: email });
    if (!establishment) {
        return done(null, false, console.log('Usuario no encontrado'));
    }
    if (!establishment.validatePassword(password)) {
        return done(null, false, console.log('Contraseña incorrecta'));
    }
    done(null, establishment, { token: service.createToken(establishment) });
}));