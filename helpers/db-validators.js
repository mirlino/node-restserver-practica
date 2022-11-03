const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if( !existeRol ) {
    throw new Error(`El rol ${ rol } no esta registrado en la DB`)
  }
}

const emailExiste = async( email = '' ) => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne( { email } );
  if( existeEmail ) {
    throw new Error(`El email: ${ email } ya esta registrado en la DB`);
  }
  
}

const userIdExiste = async( id ) => {
  // Verificar si el correo existe
  const existeId = await Usuario.findById( id );
  if( !existeId ) {
    throw new Error(`El ID: ${ id } no existe en la DB`);
  }
  
}

module.exports = {
  esRoleValido,
  emailExiste,
  userIdExiste,
}