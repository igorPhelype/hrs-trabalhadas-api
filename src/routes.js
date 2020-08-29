const express = require('express')
const HorasTrabalhadasController = require('./controllers/HorasTrabalhadasController')
const { celebrate, Joi } = require('celebrate')

const routes = express.Router()

const horasTrabalhadasController = new HorasTrabalhadasController()

// calcular horas trabalhadas
routes.post(
    '/horas-trabalhadas/totalizar',
    celebrate({
        body: Joi.object().keys({
            horaInicial: Joi.string().required(),
            horaFinal: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    horasTrabalhadasController.totalizar
)

module.exports = routes

// Pesquisar:
// Service Pattern
// Repository Pattern (Data Mapper)