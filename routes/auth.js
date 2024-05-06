/* Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validator } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router()



router.post(
'/new', 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validator
], 
crearUsuario)

router.post(
'/', 
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'el password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validator
], 
loginUsuario)

router.get('/renew', validarJWT, revalidarToken)


module.exports  = router;