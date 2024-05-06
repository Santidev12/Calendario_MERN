const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validator } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router()

// todas tienen que pasar por la validacion de jwt
router.use( validarJWT )

//  obtener eventos
router.get('/', getEventos)

// Crear un nuevo evento
router.post(
'/',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    validator
],
crearEvento)

// Actualizar evento
router.put(
'/:id',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    validator
],
actualizarEvento)

// borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;
