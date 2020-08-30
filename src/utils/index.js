/**
 * 

    function subtraiHora(hrA, hrB) {
            if(hrA.length != 5 || hrB.length != 5) return "00:00";
           
            temp = 0;
            nova_h = 0;
            novo_m = 0;
     
            hora1 = hrA.substr(0, 2) * 1;
            hora2 = hrB.substr(0, 2) * 1;
            minu1 = hrA.substr(3, 2) * 1;
            minu2 = hrB.substr(3, 2) * 1;
           
            temp = minu1 – minu2;
            while(temp < 0) {
                    nova_h++;
                    temp = temp + 60;
            }
            novo_m = temp.toString().length == 2 ? temp : ("0" + temp);
     
            temp = hora1 – hora2 – nova_h;
            while(temp < 0) {
                    temp = temp + 24;
            }
            nova_h = temp.toString().length == 2 ? temp : ("0" + temp);
     
            return nova_h + ‘:’ + novo_m;
    }


 */

module.exports = {
    nightPeriod: {
        initial: 22,
        final: 5,
    },
    dayPeriod: {
        initial: 5,
        final: 22,
    },
    subtrairHora(horaMaior = { hours: 0, minutes: 0 }, horaMenor = { hours: 0, minutes: 0 }) {
        let restoHora = 0
        let resto = horaMaior.minutes - horaMenor.minutes
        while(resto < 0) {
            restoHora++
            resto = resto + 60
        }
        // resultadoMinuto = resto.toString().length == 2 ? resto : ("0" + resto)
        const resultadoMinuto = resto
 
        resto = horaMaior.hours - horaMenor.hours - restoHora
        while(resto < 0) {
            resto = resto + 24
        }
        // const resultadoHora = resto.toString().length == 2 ? resto : ("0" + resto)
        const resultadoHora = resto

        return {
            hours: resultadoHora,
            minutes: resultadoMinuto,
        }
    },
    somarHora(hora1 = { hours: 0, minutes: 0 }, hora2 = { hours: 0, minutes: 0 }) {
        const totalHora = hora1.hours + hora2.hours
        const totalMinutos = hora1.minutes + hora2.minutes
        let restoHora = 0
        let restoMinutos = totalMinutos
        while(restoMinutos >= 60){
            restoMinutos -= 60
            restoHora += 1
        }
        return {
            hours: totalHora + restoHora,
            minutes: restoMinutos,
        }
    },
    toHourString(hora = { hours: 0, minutes: 0 }){
        return `${hora.hours.toString().padStart(2, 0)}:${hora.minutes.toString().padStart(2, 0)}`
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
    isNightPeriod() {
        const after22 = horaInicialObject.hours > utils.nightPeriod.initial
        const after0 = utils.numberIsBetween(0, utils.nightPeriod.final, horaInicialObject.hours)

    }
}