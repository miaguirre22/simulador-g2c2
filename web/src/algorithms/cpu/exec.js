/**
 * toma un proceso de memoria y lo ejecuta,
 * de acuerdo al algoritmo de planificación seleccionado.
 * 
 */
export default (state, counter) => {

    // se toman los procesos listos para ejecutar
    const procesosListos = state.memoria.particiones
    .filter(p => !p.libre)
    .map(p => p.proceso)

    // console.log(procesosListos)
    if(procesosListos.length) {

        // se obtiene el proceso a ejecutar
        let proceso = getProceso(
            state.simuladorConfig.algoritmo,
            procesosListos,
            state.memoria.particiones
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


function getProceso(algoritmo, procesos, particiones) {
    switch (algoritmo) {
        case 'FCFS':
            return getProcesoFCFS(procesos)
            break
        case 'prioridades':
            return getProcesoPrioridades(procesos)
            break
        case 'round robin':
            return getProcesoRoundRobin(procesos, particiones)
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

const quantum = 4
let q = quantum
let i = 0
let pid = null
function getProcesoRoundRobin(procesos, particiones) {
    particiones.sort((p1, p2) => {
        if(p1.id - p2.id < 0) return -1
        else return 1
     })

     let proceso = null

    // //  casos en los que el proceso no consume todo el quantum
    // if(!particiones[i].libre && pid != particiones[i].proceso.id) {
    //     q = quantum
    //     pid = particiones[i].proceso.id
    // }

    do {
        if(!particiones[i].libre) {
            q--
            proceso = particiones[i].proceso
            if(q === 0) {
                q = quantum
                if(++i === particiones.length) {
                    i = 0
                }
            }
            return proceso
        } else {
            q = quantum
            if(++i === particiones.length) {
                i = 0
            }
        }
    } while (true)
}