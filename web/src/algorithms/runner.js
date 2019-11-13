import plp from './memory/plp.js'
import pmp from './memory/pmp.js'
import pcp from './memory/pcp.js'

/**
 * MUTATION
 * recibe state como parámetro
 */
export default function runner(state) {
    let counter = 0
    plp(state, counter)
    pmp(state, counter)
    pcp(state, counter)
    // do {
    // } while(true)
}