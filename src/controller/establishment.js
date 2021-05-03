const Establishment = require('../models/local-establishment');

function getEstablishment(req, res) {
    let establishmentId = req.params.establishmentId

    Establishment.findById(establishmentId, (err, establishment) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición : ${err}` })
        if (!establishment) return res.status(404).send({ message: `El establecimiento no existe` })

        return res.status(200).send({ establishment })
    })
}

function getEstablishments(req, res) {
    Establishment.find({}, (err, establishments) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!establishments) return res.status(404).send({ message: 'No existen establecimientos' })

        return res.send(200, { establishments })
    })
}

function updateEstablishment(req, res) {
    let establishmentId = req.params.establishmentId
    let update = req.body

    Establishment.findByIdAndUpdate(establishmentId, update, (err, establishmentUpdated) => {
        if (err) res.status(500).send({ message: `Error al actualizar el establecimiento: ${err}` })

        return res.status(200).send({ establishment: establishmentUpdated })
    })
}

function deleteEstablishment(req, res) {
    let establishmentId = req.params.establishmentId

    Establishment.findById(establishmentId, (err, establishment) => {
        if (err) res.status(500).send({ message: `Error al eliminar el establecimiento: ${err}` })

        establishment.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el establecimiento: ${err}` })
            res.status(200).send({ message: 'El establecimiento ha sido eliminado' })
        })
    })
}

function search(req, res) {
    let readLyrics = req.body.name
    if (readLyrics == undefined) {
        return res.status(400).send({ message: 'Debe Escribir una letra' })
    }
    // Search
    Establishment.find({ name: { $regex: readLyrics + '.*' } }, (err, establishments) => {
        if (err) return res.status(500).send({ message: ` error al  realizar la petición: ${err}` })
        if (!establishments) return res.status(404).send({ message: 'No existen establecimientos' })

        return res.status(200).send({ establishments });
    })
}

let error = (req, res) => {
    res.send('El establecimiento no se pudo verificar');
};

module.exports = {
    getEstablishment,
    getEstablishments,
    updateEstablishment,
    deleteEstablishment,
    search,
    error
}