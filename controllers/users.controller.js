//const fs = require('fs')
const { response, request } = require('express')


const getUsers = (req = request, res = response) => {

  const { q, nombre = 'no name', apikey, page = 1, limit } = req.query;

  res.status(200).json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const postUsers = (req, res = response) => {
  
  const {nombre, edad } = req.body;
  
  res.status(200).json({
    msg: "post API - controlador",
    nombre,
    edad,
  });
};

const putUsers = (req, res = response) => {
  
  const { id } = req.params;

  res.status(200).json({
    msg: "put API - controlador",
    id,
  });
};

const patchUsers = (req, res = response) => {
  res.status(200).json({
    msg: "patch API - controlador",
  });
};

const deleteUsers = (req, res = response) => {
  res.status(200).json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers
}