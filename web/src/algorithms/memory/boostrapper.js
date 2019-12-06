import Store from "../../store/index"
/**
 * 
 * 
 */
export default (state) => {
    if(state.sistemaParticiones.tipoParticiones === 'variables') {
        state.memoria.particiones = [
            {id: 1, libre: true, space: Store.getters.freeSpace}
        ]
    } else {
        state.memoria.particiones = state.sistemaParticiones.particiones.map((p, index) => {
            return {
                id: index + 1,
                libre: true,
                space: p.tamano
            }
        })
    }

    state.histories = {
        memoria: [],
        colaNuevos: [],
        colaBloqueados: [],
        procesos: []
    }

    Store.state.resultados = {
        procesos: []
    }
}