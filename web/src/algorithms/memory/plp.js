/**
 * 
 * 
 * 
 * 
 * 
 */

export default (state, counter) => {
    state.colaNuevos.procesos = 
    state.cargaTrabajos.procesos
    .filter(p => p.tiempoArribo == counter)
}