import Store from "../../store/index"
/**
 * 
 * 
 */
export default (state) => {
    if(state.sistemaParticiones.tipoParticiones === 'variables') {
        state.memoria.particiones = [{libre: true, space: Store.getters.freeSpace}]
    } else {
        state.memoria.particiones = state.sistemaParticiones.particiones.map(p => {
            return {
                libre: true,
                space: p.tamano
            }
        })
    }
}