import boostrapper from './memory/boostrapper.js'
import agregarNuevos from './memory/agregarNuevos.js'
import plp from './memory/plp.js'
import pmp from './memory/pmp.js'
import pcp from './cpu/pcp.js'
import cleaner from './memory/cleaner.js'
import saveRun from './varios/saveRun.js'

/**
 * MUTATION
 * recibe state como parámetro
 */
export default function runner(state) {
    boostrapper(state)

    // contador de tiempo
    let counter = 0

    do {
        // agrega nuevos procesos a la cola de nuevos
        agregarNuevos(state, counter)
        // planificador a largo plazo
        plp(state, counter)
        // planificador a corto plazo
        pcp(state, counter)
        // planificador a mediano plazo
        pmp(state, counter)
        counter++
    } while(
        state.cargaTrabajos.procesos.filter(p => !p.agregado).length ||
        state.memoria.particiones.filter(p=>!p.libre).length ||
        state.colaBloqueados.procesos.length ||
        state.colaNuevos.procesos.length
    )
    
    cleaner(state)
    saveRun(state)
}