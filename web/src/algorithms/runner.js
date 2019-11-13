import boostrapper from './memory/boostrapper.js'
import plp from './memory/plp.js'
import pmp from './memory/pmp.js'
import pcp from './memory/pcp.js'

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
    } while(false)
}