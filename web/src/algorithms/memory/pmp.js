/**
 * 
 */
export default (state, counter) => {
   state.colaBloqueados.procesos.forEach(p => {
       if(p.tiempoDesbloqueo === counter) {
           p.ciclo.splice(0,1)
           state.colaNuevos.procesos.push(p)
       }
   })

   state.colaBloqueados.procesos = state.colaBloqueados.procesos.filter(p => {
       return p.tiempoDesbloqueo > counter
   })

   
}