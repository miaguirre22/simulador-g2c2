function getProcesoCola(cola, algoritmo) {
    let proceso
    if(algoritmo === 'fcfs') {
        cola.procesos.sort((a,b) => {
            if(a.ta < b.ta) return -1
            else return 1
        })
        proceso = cola.procesos[0]
    } else if(algoritmo === 'round-robin') {
        if(cola.q === 0) {
            let p = cola.procesos[0]
            cola.procesos.splice(0,1)
            cola.procesos[cola.procesos.length] = p
            cola.q = cola.quantum
        } else {
            cola.q--
        }
        proceso = cola.procesos[0]
    }
    return proceso
}

function quitarProcesoDeCola(proceso, cola) {
    let index = cola.findIndex(p => p.id === proceso.id)
    if(index !== undefined) cola.splice(index, 1)
}

module.exports = 
function(procesos) {
    var colas = {
        alta: {
            procesos: [],
            algoritmo: "fcfs"
        },
        media: {
            procesos: [],
            algoritmo: "round-robin",
            quantum: 4,
            q: 4
        },
        baja: {
            procesos: [],
            algoritmo: "fcfs"
        }
    }
    var procesoEnEjecucion
    var colaBloqueados = []
    var lineaDeTiempoProcesos = []
    var unidadDeTiempo = 0

    var quantumMultinivel = 4
    var qMultinivel = quantumMultinivel

    var colaFuturos     = procesos.filter(p => p.ta > unidadDeTiempo)
    colas.alta.procesos = procesos.filter(p => p.ta == unidadDeTiempo)

    while(
        (colas.alta.procesos.length     !== 0) ||
        (colas.media.procesos.length    !== 0) ||
        (colas.baja.procesos.length     !== 0) ||
        (colaBloqueados.length          !== 0)
    ) {
        /**
         * controlamos si un proceso llega a la memoria
         */
        colaFuturos.forEach(p => {
            if(p.ta === unidadDeTiempo) {
                colas.alta.procesos.push(p)
            }
        })

        colaFuturos = colaFuturos.filter(p => {
            return p.ta > unidadDeTiempo
        })

        unidadDeTiempo++

        if(
            (colas.alta.procesos.length) ||
            (colas.media.procesos.length) ||
            (colas.baja.procesos.length)
        ) {
            

            /**
             * se obtiene el proceso a ejecutar
             */
            var colaProcesoEnEjecucion
            if(colas.alta.procesos.length) {
                colaProcesoEnEjecucion = 'alta'
                procesoEnEjecucion = getProcesoCola(colas.alta, colas.alta.algoritmo)
            } else if(colas.media.procesos.length) {
                colaProcesoEnEjecucion = 'media'
                procesoEnEjecucion = getProcesoCola(colas.media, colas.media.algoritmo)
            } else {
                colaProcesoEnEjecucion = 'baja'
                procesoEnEjecucion = getProcesoCola(colas.baja, colas.baja.algoritmo)
            }

            procesoEnEjecucion.ciclo[0].irrupcion--
            qMultinivel--

            if(lineaDeTiempoProcesos[lineaDeTiempoProcesos.length - 1] !== procesoEnEjecucion.id) {
                lineaDeTiempoProcesos.push(procesoEnEjecucion.id)
            }

            if(qMultinivel === 0) {
                if(colaProcesoEnEjecucion === 'alta') {
                    colas.media.procesos.push(procesoEnEjecucion)
                    procesoEnEjecucion.ta = unidadDeTiempo
                    quitarProcesoDeCola(procesoEnEjecucion, colas[colaProcesoEnEjecucion].procesos)
                    colaProcesoEnEjecucion = 'media'
                } else if (colaProcesoEnEjecucion === 'media') {
                    colas.baja.procesos.push(procesoEnEjecucion)
                    procesoEnEjecucion.ta = unidadDeTiempo
                    colas.media.q = colas.media.quantum
                    quitarProcesoDeCola(procesoEnEjecucion, colas[colaProcesoEnEjecucion].procesos)
                    colaProcesoEnEjecucion = 'baja'
                }
                qMultinivel = quantumMultinivel
            }

            if(procesoEnEjecucion.ciclo[0].irrupcion === 0) {
                procesoEnEjecucion.ciclo.splice(0,1)
                if(procesoEnEjecucion.ciclo.length) {
                    procesoEnEjecucion.tiempoDesbloqueo = unidadDeTiempo + procesoEnEjecucion.ciclo[0].bloqueo
                    procesoEnEjecucion.prioridad = colaProcesoEnEjecucion
                    colaBloqueados.push(procesoEnEjecucion)
                    quitarProcesoDeCola(procesoEnEjecucion, colas[colaProcesoEnEjecucion].procesos)
                } else {
                    quitarProcesoDeCola(procesoEnEjecucion, colas[colaProcesoEnEjecucion].procesos)
                }
                qMultinivel = quantumMultinivel
            } 

        }

        colaBloqueados.forEach((p) => {
            if(p.tiempoDesbloqueo <= unidadDeTiempo) {
                p.ciclo.splice(0,1)
                p.ta = unidadDeTiempo
                colas[p.prioridad].procesos.push(p)
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