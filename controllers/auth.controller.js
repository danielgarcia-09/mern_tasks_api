const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

let authController = {};

authController.autenticarUsuario = async (req, res) => {
  
  //! Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //* Extraer el email y password del body
  const { email, password } = req.body;

  try {
    //* Revisar si es Usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: "El usuario no existe" });

    //* Revisar el password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);

    if (!passCorrecto)
      return res.status(400).json({ msg: "Password incorrecto" });

    //* Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //* Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};


//* Obtiene usuario autenticado
authController.usuarioAutenticado = async(req, res) => {
  try {
    const usuario = await Usuario.findById( req.usuario.id ).select('-password');
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error'})
  }
}

module.exports = authController;
