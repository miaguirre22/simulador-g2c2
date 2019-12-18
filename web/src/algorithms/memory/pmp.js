import Store from "../../store/index"
import { cloneDeep, remove } from 'lodash'
/**
 * 
 */
export default (state, counter) => {
    
    /* const procesosListos = state.memoria.particiones
    .filter(p => !p.libre)
    .map(p => p.proceso) */
    const procesosListos = state.colaListos.procesos

    // arreglo temporal de procesos que salen de la cola de listos, para luego
    // ser removidos.
    let procesosSalientes = []

    // START procesos que salen de la memoria (bloqueados o terminados)
    procesosListos.forEach(p => {
        if(p.ciclos[0].tipo === 'irrupcion' && p.ciclos[0].tiempo == 0) {
            // proceso terminó un ciclo de ejecución
            p.ciclos.splice(0,1)

            if(p.ciclos.length) {
                // proceso bloqueado (le quedan ciclos)
                p.tiempoDesbloqueo = p.ciclos[0].tiempo + counter
                state.colaBloqueados.procesos.push(p)

            } else {
                // proceso terminado (se terminaron los ciclos)

                // se agrega el proceso terminado al arreglo de resultados
                // para mostrarlo
                Store.state.resultados.procesos.push({
                    id: p.id,
                    tiempoRetorno: counter - p.tiempoArribo,
                    tiempoEspera: (() => {
                        // se calcula el tiempo de espera como
                        // tiempoRetorno - tiempoIrrupcionTotal
                        let proc = state.cargaTrabajos.procesos.find(t => t.id === p.id)
                        let sumIrrupciones = proc.ciclos.reduce((ac,c) => {
                            if(c.tipo === 'irrupcion') {
                                return ac + c.tiempo
                            } else return 0
                        }, 0)
                        return counter - p.tiempoArribo - sumIrrupciones
                    })()
                })

                // se libera la partición cuando el proceso terminó
                // su ejecución
                const particionLiberada = state.memoria.particiones
                .find(part => !part.libre && part.proceso.id == p.id)
                particionLiberada.libre = true
                particionLiberada.proceso = null

                // en el caso de particiones variables, se mergean
                // particiones vacías contiguas.
    
                if(Store.state.sistemaParticiones.tipoParticiones === 'variables') {
    
                    state.memoria.particiones.sort((p1, p2) => p1.id - p2.id)
    
                    let count = 0
    
                    // variable temporal donde se guardan particiones libres contiguas.
                    let arr = []
    
                    while(count < state.memoria.particiones.length) {
    
                        // se agrega la partición libre a la variable temporal
                        if(state.memoria.particiones[count].libre) {
                            arr.push(state.memoria.particiones[count])
                        }
                        
    
                        if(!state.memoria.particiones[count].libre || (count + 1 == state.memoria.particiones.length)) {
                            if(arr.length > 1) {
                                let newPart = {
                                    libre: true,
                                    space: arr.reduce((ac, c)=>ac + c.space, 0),
                                    id: arr[0].id
                                }
    
                                // se quitan las particiones que se unieron de la memoria
                                arr.forEach(a => {
                                    remove(state.memoria.particiones, (i) => i.id == a.id)
                                })
    
                                // se agrega la nueva partición a la memoria
                                state.memoria.particiones.push(newPart)
    
                                // se ordenan las particiones por ID de partición
                                state.memoria.particiones.sort((p1, p2) => p1.id - p2.id)
    
                                // se resetean los IDs de las partición
                                state.memoria.particiones.forEach((p, index) => p.id = index + 1)
    
                                arr = []
                            } else {
                                arr = []
                            }
                        }
                        count++
    
                    } // END while
    
                    state.memoria.particiones.sort((p1, p2) => p1.id - p2.id)
                    state.memoria.particiones.forEach((p, index) => p.id = index + 1)
                } // END tipoParticiones === 'variables'

            } // END else (p.ciclos.length)

            // se agrega a la cola de remoción
            procesosSalientes.push(p)
        }
    }) // END procesosListos.forEach
    
    // se quitan los procesos que terminaron o se bloquearon de la cola de listos.
    procesosSalientes.forEach(p => {
        let pIndex = procesosListos.findIndex(pl => pl.id === p.id)
        procesosListos.splice(pIndex, 1)
    })
    // END procesos que salen de la memoria (bloqueados o terminados)


    // START procesos que salen de la cola de bloqueados a la cola de listos.
    state.colaBloqueados.procesos.forEach(p => {
        if(p.tiempoDesbloqueo === counter) {
            p.ciclos.splice(0,1)
            p.tiempoArriboListos = counter
            state.colaListos.procesos.push(p)
        }
    })
    state.colaBloqueados.procesos = state.colaBloqueados.procesos.filter(p => {
        return p.tiempoDesbloqueo > counter
    })
    // END procesos que salen de la cola de bloqueados a la cola de listos.


    // history
    state.histories.colaBloqueados.push({
        time: counter,
        snapshot: cloneDeep(state.colaBloqueados)
    })

    // history
    state.histories.memoria.push({
        time: counter,
        snapshot: cloneDeep(state.memoria)
    })
   
}