import { cloneDeep } from 'lodash'

/**
 * agrega los procesos que llegan a la memoria a la cola de nuevos.
 */
export default (state, counter) => {
    state.cargaTrabajos.procesos
    .filter(p => p.tiempoArribo == counter)
    .forEach(p => {
        p.agregado = true
        state.colaNuevos.procesos
        .push(cloneDeep(p))
        
    })
    
    // history
    state.histories.colaNuevos.push({
        time: counter,
        snapshot: cloneDeep(state.colaNuevos)
    })
}