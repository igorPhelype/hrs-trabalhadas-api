module.exports = {
    nightPeriod: {
        initial: 22,
        final: 5,
    },
    dayPeriod: {
        initial: 5,
        final: 22,
    },
    /**
     * 
     * @param {String} hourString
     */
    toHourObject(hourString = '') {
        const [hours, minutes] = hourString.split(':')
        return {
            hours: Number(hours), minutes: Number(minutes)
        }
    },
    numberIsBetween(x, y, number) {
        return number >= x && number < y
    },
    isNightPeriod(){
        const after22 = horaInicialObject.hours > utils.nightPeriod.initial
        const after0 = utils.numberIsBetween(0, utils.nightPeriod.final, horaInicialObject.hours)

    }
}