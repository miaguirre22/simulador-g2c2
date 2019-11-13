/**
 * 
 * 
 * 
 * 
 * 
 */

export default (state, counter) => {
    state.colaNuevos = 
    state.cargaTrabajos.procesos
    .filter(p => p.tiempoArribo == counter)
}