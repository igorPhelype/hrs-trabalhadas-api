const utils = require("../utils")
const { subtrairHora } = require("../utils")

class HorasTrabalhadasController {

    /**
     * 
     * @param {Request} request 
     * @param {Response} response 
     */
    async totalizar(request, response) {
        const { horaInicial, horaFinal } = request.body
        const horaInicialObject = utils.toHourObject(horaInicial)
        const horaFinalObject = utils.toHourObject(horaFinal)
        let result = {}
        const safter22 = horaInicialObject.hours >= utils.nightPeriod.initial
        const safter0 = utils.numberIsBetween(0, utils.nightPeriod.final, horaInicialObject.hours)
        const startsInNightPeriod = safter22 || safter0

        const eafter22 = horaFinalObject.hours >= utils.nightPeriod.initial
        const eafter0 = utils.numberIsBetween(0, utils.nightPeriod.final, horaFinalObject.hours)
        const endsInNightPeriod = eafter22 || eafter0

        if (startsInNightPeriod) {
            result = {
                totalizadorDia: endsInNightPeriod ? { hours: 0, minutes: 0 } : utils.subtrairHora(horaFinalObject, { hours: utils.dayPeriod.initial, minutes: 0 }),
                totalizadorNoite: utils.somarHora((safter22 ? utils.subtrairHora({ hours: 24, minutes: 0 }, horaInicialObject) : { hours: 0, minutes: 0 }), (endsInNightPeriod ? horaFinalObject : { hours: utils.nightPeriod.final, minutes: 0 })),
            }
        } else {
            const dayAditional = horaFinalObject.hours < horaInicialObject.hours
                ? utils.subtrairHora(horaFinalObject, { hours: utils.dayPeriod.initial, minutes: 0 })
                : { hours: 0, minutes: 0 }
            result = {
                totalizadorDia: (endsInNightPeriod
                    ? utils.subtrairHora({ hours: 22, minutes: 0 }, horaInicialObject)
                    : utils.somarHora(
                        // utils.subtrairHora({ hours: utils.dayPeriod.final, minutes: 0 }, horaInicialObject)
                        utils.subtrairHora(horaFinalObject, horaInicialObject)
                    , dayAditional)),
                totalizadorNoite: endsInNightPeriod
                    ? (eafter0 ? utils.somarHora({ hours: 2, minutes: 0 }, horaFinalObject) : utils.subtrairHora(horaFinalObject, { hours: 22, minutes: 0 }))
                    : (horaFinalObject.hours < horaInicialObject.hours ? { hours: 7, minutes: 0 } : { hours: 0, minutes: 0 }),
            }
        }
        response.status(200).json({ horasTrabalhadasDia: utils.toHourString(result.totalizadorDia), horasTrabalhadasNoite: utils.toHourString(result.totalizadorNoite) })
    }
}

module.exports = HorasTrabalhadasController