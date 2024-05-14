const { response } = require("express");
const Event = require("../models/Event");

const getEventos = async( req, res = response ) => {
    
    
    try {

        const eventos = await Event.find().populate('user', 'name')
    
        return res.status(200).json({
            ok: true,
            eventos: eventos
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener el evento'
        })
    }
}

const crearEvento = async( req, res = response ) => {
    
    const evento = new Event( req.body );

    try {
        evento.user = req.uid
        const eventSaved = await evento.save();
        return res.status(200).json({
            ok: true,
            evento: eventSaved
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al crear el evento'
        })
    }
}

const actualizarEvento = async( req, res = response ) => {
    
    // const { id, title, start, end, user } = req.body;
    const eventoId = req.params.id
    const uid = req.uid
    try {
        
        const evento = await Event.findById( eventoId )
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para actualizar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Event.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento'
        })
    }
}

const eliminarEvento = async( req, res = response ) => {
    
    // const { id, title, start, end, user } = req.body;
    const eventoId = req.params.id
    const uid = req.uid
    try {
        
        const evento = await Event.findById( eventoId )
        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para actualizar este evento'
            })
        }

        const eventoActualizado = await Event.findByIdAndDelete( eventoId, { new: true} );

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el evento'
        })
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}