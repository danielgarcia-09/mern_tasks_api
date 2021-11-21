const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

let usuarioController = {};

usuarioController.crearUsuario = async(req, res) => {

    //! Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    try {

        //* Revisar si el usuario es unico
        let usuario = await Usuario.findOne({ email })

        if( usuario ) {
            res.status(400).json({
                msg: 'Este correo ya esta siendo usado por otro usuario'
            });
        }
        //* crear nuevo usuario
        usuario = new Usuario(req.body);

        //* Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //* guardar nuevo usuario
        await usuario.save();

        //* Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id,
                
            }
        }

        //* Firmar el JWT
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        }, (err, token)=> {
            if(err) throw err;

            res.status(201).json({ token })
        })

       
    } catch (error) {
        console.log(error);
        res.status(400).json({
            err: 'hubo un error'
        })
    }
}

module.exports = usuarioController;