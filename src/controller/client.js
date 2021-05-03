const Client = require('../models/local-client');

function getClient(req, res) {
    let clientId = req.params.clientId

    Client.findById(clientId, (err, client) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición : ${err}` })
        if (!client) return res.status(404).send({ message: `El cliente no existe` })

        return res.status(200).send({ client })
    })
}

function getClients(req, res) {
    Client.find({}, (err, clients) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!clients) return res.status(404).send({ message: 'No existen clientes' })

        return res.send(200, { clients })
    })
}

function updateClient(req, res) {
    let clientId = req.params.clientId
    let update = req.body

    Client.findByIdAndUpdate(clientId, update, (err, clientUpdated) => {
        if (err) res.status(500).send({ message: `Error al actualizar el cliente: ${err}` })

        return res.status(200).send({ client: clientUpdated })
    })
}

function deleteClient(req, res) {
    let clientId = req.params.clientId

    Client.findById(clientId, (err, client) => {
        if (err) res.status(500).send({ message: `Error al eliminar el cliente: ${err}` })

        client.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el cliente: ${err}` })
            res.status(200).send({ message: 'El cliente ha sido eliminado' })
        })
    })
}

function search(req, res) {
    let readLyrics = req.body.name
    if (readLyrics == undefined) {
        return res.status(400).send({ message: 'Debe Escribir una letra' })
    }
    // Search
    Client.find({ name: { $regex: readLyrics + '.*' } }, (err, clients) => {
        if (err) return res.status(500).send({ message: ` error al  realizar la petición: ${err}` })
        if (!clients) return res.status(404).send({ message: 'No existen clientes' })

        return res.status(200).send({ clients });
    })
}

let error = (req, res) => {
    res.send('El usuario no se pudo verificar');
};

module.exports = {
    getClient,
    getClients,
    updateClient,
    deleteClient,
    search,
    error
}