/**
 * toma un proceso de memoria y lo ejecuta,
 * de acuerdo al algoritmo de planificación seleccionado.
 * 
 */
export default (state, counter) => {

    // se toman los procesos listos para ejecutar
    // const procesosListos = state.memoria.particiones
    // .filter(p => !p.libre)
    // .map(p => p.proceso)

    const procesosListos = state.colaListos.procesos

    // console.log(procesosListos)
    if(procesosListos.length) {

        // se obtiene el proceso a ejecutar
        let proceso = getProceso(
            state.simuladorConfig.algoritmo,
            procesosListos,
            state.simuladorConfig.quantum,
            counter
        )

        if(proceso.ciclos[0].tipo === 'irrupcion' && proceso.ciclos[0].tiempo > 0) {
            proceso.ciclos[0].tiempo--
        }
        // history
        state.histories.procesos.push({
            time: counter,
            snapshot: proceso.id 
        })
    } else {
        // no hay ningún proceso listo para ejecutar

        // history
        state.histories.procesos.push({
            time: counter,
            snapshot: null
        })
    }

}


function getProceso(algoritmo, procesos, quantum, counter) {
    switch (algoritmo) {
        case 'FCFS':
            return getProcesoFCFS(procesos)
            break
        case 'prioridades':
            return getProcesoPrioridades(procesos)
            break
        case 'round robin':
            return getProcesoRoundRobin(quantum, procesos, counter)
            break
    }
}


function getProcesoFCFS(procesos) {
    // se ordena por id
    procesos.sort((a,b) => {
        return a.id - b.id
    })
    
    // se ordena por tiempo de llegada a la cola de listos.
    // en el caso que 2 procesos tengan tiempos de llegada iguales, 
    // se ordena por id.
    
    procesos.sort((a,b) => {
        return a.tiempoArriboListos - b.tiempoArriboListos
    })

    return procesos[0]
}


function getProcesoPrioridades(procesos) {
    procesos.sort((a,b) => {
        return a.id - b.id
    })

    // se ordena por prioridad de los procesos.
    // en el caso que 2 procesos tengan prioridades iguales, 
    // se ordena por id.

    procesos.sort((a,b) => {
        return a.prioridad - b.prioridad
    })

    return procesos[0]
}

let q = null
let i = 0
let pid = null
function getProcesoRoundRobin(quantum, procesos, counter) {
    if(counter === 0) {
        q = quantum
    }

    procesos.sort((p1, p2) => {
        return p1.id - p2.id
    })

    let proceso = null
    
    // casos en los que el índice supera el tamaño de la cola de listos. 
    if(i >= procesos.length) {
        i = 0
    }

    //  casos en los que el proceso no consume todo el quantum
    if(pid != procesos[i].id) {
        q = quantum
    }

    do {
        if(i < procesos.length) {
            q--
            proceso = procesos[i]
            // se setea el pid del proceso que se está por ejecutar
            pid = procesos[i].id
            if(q === 0) {
                q = quantum
                if(++i === procesos.length) {
                    i = 0
                }
            }
            return proceso
        } else {
            q = quantum
            if(++i === procesos.length) {
                i = 0
            }
        }
    } while (true)
}