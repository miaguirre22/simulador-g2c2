/**
 * toma un proceso de memoria y lo ejecuta,
 * de acuerdo al algoritmo de planificación seleccionado.
 * 
 */
export default (state, counter) => {
    const procesosListos = state.memoria.particiones
    .filter(p => !p.libre)
    .map(p => p.proceso)

    // console.log(procesosListos)
    if(procesosListos.length) {
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
    procesos.sort((a,b) => {
        console.log(a, b)
        if(a.id - b.id < 0) return 1
        else return -1
    })
    procesos.sort((a,b) => {
        console.log(a, b)
        if(a.tiempoArriboListos <= b.tiempoArriboListos) return -1
        else return 1
    })

    return procesos[0]
}


function getProcesoPrioridades(procesos) {
    procesos.sort((a,b) => {
        if(a.id - b.id < 0) return 1
        else return -1
    })
    procesos.sort((a,b) => {
        if(a.prioridad <= b.prioridad) return 1
        else return -1
    })

    return procesos[0]
}

const quantum = 4
let q = quantum
let i = 0
function getProcesoRoundRobin(procesos, particiones) {
    particiones.sort((p1, p2) => {
        if(p1.id - p2.id < 0) return -1
        else return 1
     })

     let proceso = null
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
            i++
            q = quantum
            if(i === particiones.length) {
                i = 0
            }
        }
    } while (true)
}