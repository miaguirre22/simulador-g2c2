import { cloneDeep } from 'lodash'
/**
 * saveRun
 * 
 * guarda la información de la corrida.
 */
export default (state) => {
    let runs = JSON.parse(localStorage.getItem('runs')) || []
    let corrida = {
        cargaTrabajos: cloneDeep(state.cargaTrabajos),
        sistemaParticiones: cloneDeep(state.sistemaParticiones),
        simuladorConfig: cloneDeep(state.simuladorConfig),
        retornoPromedio: (() => {
            return state.resultados.procesos
            .reduce((ac,c)=> ac + c.tiempoRetorno, 0) / state.resultados.procesos.length
        })(),
        esperaPromedio: (() => {
            return state.resultados.procesos
            .reduce((ac,c)=> ac + c.tiempoEspera, 0) / state.resultados.procesos.length
        })()
    }
    // if(!runs) {
    //     runs = []
    // }
    runs.push(corrida)

    localStorage.setItem('runs', JSON.stringify(runs))
}