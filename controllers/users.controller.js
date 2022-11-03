const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsers = async(req = request, res = response) => {

  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true }

  // const usuarios = await Usuario.find( query )
  // .skip( Number( desde ) )
  // .limit( Number( limite ) );

  // const total = await Usuario.countDocuments( query );

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments( query ),
    Usuario.find( query )
      .skip( Number( desde ) )
      .limit( Number( limite ) )

  ]);

  res.json({
    total,
    usuarios
  });
};

const postUsers = async (req, res = response) => {
 
   const { nombre, email, password, rol } = req.body;
  const usuario = new Usuario( { nombre, email, password, rol } );

  
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  //Guardar en BD  
  await usuario.save();

  res.json({
    usuario
  });
};

const putUsers = async(req, res = response) => {
  
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  // TODO validar contra base de datos
  if ( password ) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt );
  }

  const usuarioDB = await Usuario.findByIdAndUpdate( id, resto );

  res.json(usuarioDB);

};

const patchUsers = (req, res = response) => {
  res.status(200).json({
    msg: "patch API - controlador",
  });
};

const deleteUsers = async (req, res = response) => {
  
  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  //Es recomendable deshabilitarlo y no eliminar a los usuarios de las DB
  const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});
  
  res.json({
    usuario
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
}