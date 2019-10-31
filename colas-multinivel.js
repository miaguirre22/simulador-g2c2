// le paso una cola de procesos y un algoritmo de planificación
// segun el algoritmo, me devuelve un proceso
function getProcesoCola(cola, algoritmo) {
    let proceso
    if(algoritmo === 'fcfs') {
        // ordena la cola de procesos por tiempo de arribo
        cola.procesos.sort((a,b) => {
            if(a.ta < b.ta) return -1
            else return 1
        })
        proceso = cola.procesos[0]
    } else if(algoritmo === 'round-robin') {
        // si el proceso consumio todo el quantum
        // debe ir al final de la cola
        // sino, resto 1 a el quantum
        if(cola.q === 0) {
            // let p = cola.procesos[0]
            // cola.procesos.splice(0,1)
            // cola.procesos[cola.procesos.length] = p
            // cola.q = cola.quantum
            
            //quantumMultinivel = cola.quantum

            if(cola.prioridad === 'alta') {
                // ¿ esta bien el orden de las instrucciones ?
                cola.media.procesos.push(cola.procesos[0])                    
                quitarProcesoDeCola(cola.proceso[0], colas.alta.procesos)
                cola.prioridad = 'media'
            } else if (cola.prioridad === 'media') {
                cola.baja.procesos.push(cola.procesos[0])                    
                quitarProcesoDeCola(cola.proceso[0], colas.media.procesos)
                cola.prioridad = 'baja'
            }
            
            cola.q = cola.quantum
            //qMultinivel = cola.quantum

        } else {
            cola.q--
            //qMultinivel--
        }
        proceso = cola.procesos[0]
    }
    return proceso
}

// le paso un proceso y una cola de procesos
// si el proceso esta en la cola, lo quito
function quitarProcesoDeCola(proceso, cola) {
    let index = cola.findIndex(p => p.id === proceso.id)
    if(index !== undefined) cola.splice(index, 1)
}

module.exports = 
function(procesos) {
    // defino las colas o niveles
    var colas = {
        alta: {
            procesos: [],
            algoritmo: "round-robin",
            quantum: 2,
            q: 2
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

    var colaAlta = []
    var colaMedia = []
    var colaBaja = []
    
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

            // pone en el Gantt el ID del proceso, una sola vez
            //if(lineaDeTiempoProcesos[lineaDeTiempoProcesos.length - 1] !== procesoEnEjecucion.id){
            //if(qMultinivel === quantumMultinivel){
            if(lineaDeTiempoProcesos[lineaDeTiempoProcesos.length - 1] !== procesoEnEjecucion.id){
                // // Opcion: muestra solo ID (tipo numerico)
                // lineaDeTiempoProcesos.push(procesoEnEjecucion.id)
                
                // Opcion: muestra ID + Irrupcion (tipo string)
                lineaDeTiempoProcesos.push(procesoEnEjecucion.id +"("+ procesoEnEjecucion.ciclo[0].irrupcion + ")")

                colaAlta.push(colaProcesoEnEjecucion)
            }
            
            procesoEnEjecucion.ciclo[0].irrupcion--
            qMultinivel--

            // si se consume el quantum multinivel, 
            // se mueve el proceso a una cola de nivel inferior: media o baja
            // if(qMultinivel === 0) {
            //     if(colaProcesoEnEjecucion === 'alta') {
            //         // ¿ esta bien el orden de las instrucciones ?
            //         colas.media.procesos.push(procesoEnEjecucion)
            //         procesoEnEjecucion.ta = unidadDeTiempo
            //         quitarProcesoDeCola(procesoEnEjecucion, colas[colaProcesoEnEjecucion].procesos)
            //         colaProcesoEnEjecucion = 'media'
            //     } else if (colaProcesoEnEjecucion === 'media') {
            //         colas.baja.procesos.push(procesoEnEjecucion)
            //         procesoEnEjecucion.ta = unidadDeTiempo
            //         colas.media.q = colas.media.quantum
            //         quitarProcesoDeCola(procesoEnEjecucion, colas[colaProcesoEnEjecucion].procesos)
            //         colaProcesoEnEjecucion = 'baja'
            //     }
            //     qMultinivel = quantumMultinivel
            // }

            // ciclo irrupcion de proceso
            // si completo el ciclo de irrupcion, se pasa a la cola de bloqueado
            // si no tiene mas ciclos de irrupcion, se quita de la cola de ejecucion (sale de memoria)
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
                // restauro el quantum multinivel
                //qMultinivel = quantumMultinivel
            } 

        }

        // cola de procesos bloqueados
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
        gantt: lineaDeTiempoProcesos,
        colaAlta: colaAlta
    }

}