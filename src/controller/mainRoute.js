const express = require('express');

let index = (req, res) => {
    res.send('Fly Order. App de gestión de ordenes y pedidos')
};

module.exports = {
    index
}