const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' // Nombre del modelo al que quieres referenciar
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Proyecto', ProyectoSchema);