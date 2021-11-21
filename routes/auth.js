const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');
const autenticar = require('../middlewares/auth');

//* Iniciar sesion
router.post('/',
    authController.autenticarUsuario
);

//* Obtener el usuario autenticado
router.get('/',
    autenticar,
    authController.usuarioAutenticado
)

module.exports = router;