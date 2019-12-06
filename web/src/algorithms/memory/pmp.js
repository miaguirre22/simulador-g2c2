import Store from "../../store/index"
import { cloneDeep, remove } from 'lodash'
/**
 * 
 */
export default (state, counter) => {

    const procesosListos = state.memoria.particiones
    .filter(p => !p.libre)
    .map(p => p.proceso)

    // procesos que salen de la memoria (bloqueados o terminados)
    procesosListos.forEach(p => {
        if(p.ciclos[0].tipo === 'irrupcion' && p.ciclos[0].tiempo == 0) {

            // proceso terminó un ciclo de ejecución

            p.ciclos.splice(0,1)
            if(p.ciclos.length) {
                p.tiempoDesbloqueo = p.ciclos[0].tiempo + counter
                state.colaBloqueados.procesos.push(p)
            } else {
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
                            }
                        }, 0)
                        return counter - p.tiempoArribo - sumIrrupciones
                    })()
                })
            }
            

            // se libera la partición

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

                } /* while */

                state.memoria.particiones.sort((p1, p2) => p1.id - p2.id)
                state.memoria.particiones.forEach((p, index) => p.id = index + 1)
            }
        }
    })
    // procesos que salen de la memoria (bloqueados o terminados)

    // procesos que salen de la cola de bloqueados a la cola de nuevos.
    // para que el PLP se encargue de agregarlos a la cola de listos si corresponde.
    state.colaBloqueados.procesos.forEach(p => {
        if(p.tiempoDesbloqueo === counter) {
            p.ciclos.splice(0,1)
            state.colaNuevos.procesos.push(p)
        }
    })
    state.colaBloqueados.procesos = state.colaBloqueados.procesos.filter(p => {
        return p.tiempoDesbloqueo > counter
    })
    // procesos que salen de la cola de bloqueados a la cola de nuevos.
    // para que el PLP se encargue de agregarlos a la cola de listos si corresponde.


    // history
    state.histories.colaBloqueados.push({
        time: counter,
        snapshot: cloneDeep(state.colaBloqueados)
    })
   
}