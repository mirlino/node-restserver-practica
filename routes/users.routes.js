
const { Router } = require('express');
const { check } = require('express-validator');


const { getUsers, postUsers,  putUsers,  patchUsers,  deleteUsers } = require('../controllers/users.controller');
const { esRoleValido, emailExiste, userIdExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsers);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe contener minimo 6 caracteres').isLength({ min: 6 }),
  check('email', 'El email no es válido').isEmail(),
  check('email').custom( emailExiste ),
  // check('rol', 'No es un rol válido').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
  check('rol').custom( esRoleValido ),
  validarCampos
], postUsers);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( userIdExiste ),
  check('rol').custom( esRoleValido ),
  validarCampos
], putUsers);

router.patch('/', patchUsers);

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( userIdExiste ),
  validarCampos
],
 deleteUsers);

module.exports = router;