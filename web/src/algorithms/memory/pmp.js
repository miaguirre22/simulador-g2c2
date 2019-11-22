import { cloneDeep } from 'lodash'
/**
 * 
 */
export default (state, counter) => {

    const procesosListos = state.memoria.particiones
    .filter(p => !p.libre)
    .map(p => p.proceso)

    procesosListos.forEach(p => {
        if(p.ciclos[0].tipo === 'irrupcion' && p.ciclos[0].tiempo == 0) {
            p.ciclos.splice(0,1)
            if(p.ciclos.length) {
                p.tiempoDesbloqueo = p.ciclos[0].tiempo + counter
                state.colaBloqueados.procesos.push(p)

            }
            const particionLiberada = state.memoria.particiones
            .find(part => !part.libre && part.proceso.id == p.id)
            particionLiberada.libre = true
            particionLiberada.proceso = null
        }
    })

    state.colaBloqueados.procesos.forEach(p => {
        if(p.tiempoDesbloqueo === counter) {
            p.ciclos.splice(0,1)
            state.colaNuevos.procesos.push(p)
        }
    })

    state.colaBloqueados.procesos = state.colaBloqueados.procesos.filter(p => {
        return p.tiempoDesbloqueo > counter
    })

    // history
    state.histories.colaBloqueados.push({
        time: counter,
        snapshot: cloneDeep(state.colaBloqueados)
    })
   
}