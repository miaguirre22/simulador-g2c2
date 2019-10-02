/**
 * 
 * algoritmo de planificación por prioridades
 * 
 * 1. hacer unidad a unidad
 * 2. en cada iteración hay que controlar si un proceso de mayor prioridad 
 * entró a la cola de listos
 * 3. en cada iteración hay que ir restando una unidad de irrupción o bloqueo
 * 
 * 
 */
module.exports = 

/**
 * @typedef {any} Proceso
 * @prop {number} id 
 * @prop {number} ta tiempo de arribo
 * @prop {number} prioridad
 * @prop {Ciclo[]} ciclo
 * 
 * @typedef {any} Ciclo
 * @prop {number} [irrupcion]
 * @prop {number} [bloqueo]
 * 
 * @param {Proceso[]} procesos
 * 
 */
function(procesos /* array */) {

    var unidadDeTiempo = 0
    var colaFuturos = procesos.filter(p => p.ta > unidadDeTiempo)
    var colaListos = procesos.filter(p => p.ta == unidadDeTiempo)
    var procesoEnEjecucion
    var colaBloqueados = []
    var lineaDeTiempoProcesos = []
    
    while((colaListos.length !== 0) || (colaBloqueados.length !== 0)) {
        
        /**
         * controlamos si un proceso llega a la memoria
         */
        colaFuturos.forEach(p => {
            if(p.ta === unidadDeTiempo) {
                colaListos.push(p)
            }
        })

        colaFuturos = colaFuturos.filter(p => {
            return p.ta > unidadDeTiempo
        })

        if(colaListos.length) {

            unidadDeTiempo++

            // orden en base a la prioridad
            colaListos.sort((a,b) => {
                if(a.prioridad < b.prioridad) return -1
                else return 1
            })
        
            var procesoEnEjecucion = colaListos[0]
        
            procesoEnEjecucion.ciclo[0].irrupcion--

            if(lineaDeTiempoProcesos[lineaDeTiempoProcesos.length - 1] !== procesoEnEjecucion.id) {
                lineaDeTiempoProcesos.push(procesoEnEjecucion.id)
            }

            if(procesoEnEjecucion.ciclo[0].irrupcion === 0) {
                procesoEnEjecucion.ciclo.splice(0,1)
                if(procesoEnEjecucion.ciclo.length) {
                    procesoEnEjecucion.tiempoDesbloqueo = unidadDeTiempo + procesoEnEjecucion.ciclo[0].bloqueo
                    colaBloqueados.push(colaListos.splice(0,1)[0])
                } else {
                    colaListos.splice(0,1)
                }
            }
        } else {
            unidadDeTiempo++
        }
    
        colaBloqueados.forEach((p) => {
            if(p.tiempoDesbloqueo <= unidadDeTiempo) {  // podria cambiar <= por = ???
                p.ciclo.splice(0,1)
                colaListos.push(p)
            }
        })
        colaBloqueados = colaBloqueados.filter(p => {
            return p.tiempoDesbloqueo > unidadDeTiempo
        })
    }
    
    return {
        tiempoRetorno: unidadDeTiempo,
        gantt: lineaDeTiempoProcesos
    }
}

