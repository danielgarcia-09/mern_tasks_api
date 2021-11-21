const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyecto.controller');
const autenticar = require('../middlewares/auth');
const { check } = require('express-validator');

//* Crear Proyecto
router.post('/',
    autenticar,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

router.get('/req',
    autenticar,
    proyectoController.verRequest
)

//* Obtener todos los proyectos
router.get('/',
    autenticar,
    proyectoController.obtenerProyectos
)

//* Actualizar proyecto por ID
router.put('/:id',
    autenticar,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

//* Eliminar proyecto por ID
router.delete('/:id',
    autenticar,
    proyectoController.eliminarProyecto
)
module.exports = router;