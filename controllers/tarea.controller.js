const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

let tareaController = {};

tareaController.crearTarea = async (req, res) => {

  //* Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty())
    return res.status(400).json({ errores: errores.array() });

  try {
    //* Extraer el proyecto si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto)
      return res.status(404).json({ msg: "Proyecto no encontrado " });

    //* Revisar si el proyecto pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //* Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

tareaController.obtenerTareas = async (req, res) => {
  try {
    //* Extraer el proyecto si existe
    const { proyecto } = req.query;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto)
      return res.status(404).json({ msg: "Proyecto no encontrado " });

    //* Revisar si el proyecto pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //* Obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

tareaController.actualizarTarea = async (req, res) => {
  try {

    //* Extraer valores si existen
    const { proyecto, nombre, estado } = req.body;

    //* Si la tarea existe o no
    let tarea = await Tarea.findById(req.params.id);

    if( !tarea )  return res.status(404).json({ msg: "Tarea no encontrada " });

    //* Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto)
      return res.status(404).json({ msg: "Proyecto no encontrado " });

    //* Revisar si el proyecto pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //* Nueva Tarea
    const newTarea = {
      nombre,
      estado
    };
    //* Guardar la Tarea
    tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, newTarea, { new:true });

    res.json({ tarea })

  } catch (error) {

    console.log(error);
    res.status(500).send("hubo un error");
     
  }
};

tareaController.eliminarTarea = async(req, res) => {
    try {
        //* Extraer valores si existen
        const { proyecto } = req.query;

        //* Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if( !tarea )  return res.status(404).json({ msg: "Tarea no encontrada " });

        //* Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) return res.status(404).json({ msg: "Proyecto no encontrado " });

        //* Revisar si el proyecto pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) return res.status(401).json({ msg: "No Autorizado" });

        //* Eliminar
        await Tarea.findByIdAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

module.exports = tareaController;
