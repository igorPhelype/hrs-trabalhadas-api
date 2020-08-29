const utils = require("../utils")

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
                totalizadorNoite: (safter22 ? 24 - horaInicialObject.hours : 0) + (endsInNightPeriod ? horaFinalObject.hours : utils.nightPeriod.final),
                totalizadorDia: horaFinalObject.hours - utils.dayPeriod.initial,
            }
        } else {
            console.log(!endsInNightPeriod)
            const dayAditional = horaFinalObject.hours < horaInicialObject.hours ? horaFinalObject.hours - utils.dayPeriod.initial : 0
            result = {
                totalizadorNoite: endsInNightPeriod
                    ?   (eafter0 ? 2 + horaFinalObject.hours : horaFinalObject.hours - 22)
                    :   (horaFinalObject.hours < horaInicialObject.hours ? 7 : 0),
                totalizadorDia: !endsInNightPeriod ? utils.dayPeriod.final - horaInicialObject.hours + dayAditional : 22 - horaInicialObject.hours
            }
        }
        response.status(200).json(result)
    }
}

module.exports = HorasTrabalhadasController