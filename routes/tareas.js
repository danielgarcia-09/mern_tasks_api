const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tarea.controller');
const autenticar = require('../middlewares/auth');
const { check } = require('express-validator');

//* Crear una tarea
router.post('/',
    autenticar,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)

//* Obtener las tareas por proyecto
router.get('/',
    autenticar,
    tareaController.obtenerTareas
)

//* Actualizar tarea por ID
router.put('/:id',
    autenticar,
    tareaController.actualizarTarea
)

//* Eliminar tarea por ID
router.delete('/:id',
    autenticar,
    tareaController.eliminarTarea
)

module.exports = router;