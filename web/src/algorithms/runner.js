import boostrapper from './memory/boostrapper.js'
import plp from './memory/plp.js'
import pmp from './memory/pmp.js'
import pcp from './memory/pcp.js'
import exec from './cpu/exec.js'
import cleaner from './memory/cleaner.js'
import saveRun from './varios/saveRun.js'

/**
 * MUTATION
 * recibe state como parámetro
 */
export default function runner(state) {
    boostrapper(state)
    let counter = 0
    do {
        plp(state, counter)
        pmp(state, counter)
        pcp(state, counter)
        exec(state, counter)
        counter++
    } while(
        state.colaBloqueados.procesos.length ||
        state.colaNuevos.procesos.length ||
        state.cargaTrabajos.procesos.filter(p => !p.agregado).length ||
        state.memoria.particiones.filter(p=>!p.libre).length
    )
    cleaner(state)
    saveRun(state)
}