const express = require('express');
const usuarios = require('./routes/usuarios');
const proyectos = require('./routes/proyectos');
const tareas = require('./routes/tareas');
const auth = require('./routes/auth');
const conectarDB = require('./config/db');
const cors = require('cors');

//* Crear servidor
const app = express();

//* Conectar DB
conectarDB();

//todo Middlewares
app.use( express.json({ extended: true }) );
app.use( cors() );
//* Puerto de la app
const port = process.env.PORT || 4000;

//* Rutas de la pp
app.use('/api/usuarios', usuarios);
app.use('/api/proyectos', proyectos);
app.use('/api/tareas', tareas);
app.use('/api/auth', auth);

// iniciar la app
app.listen(port,'0.0.0.0', ()=> {
    console.log(`http://localhost:${port}`);
})

module.exports = app;