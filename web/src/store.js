import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';
import runner from './algorithms/runner'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      simuladorConfig: {
          algoritmos: [
            "FCFS",
            "prioridades",
            "round robin",
            "colas multinivel"
          ],
          algoritmo: null,
          tamanos: [32, 64, 128, 256, 512, 1024],
          tamanoMemoria: null,
          porcentajes: [5, 10, 15, 20],
          porcentajeUsoSO: null,
      },
      memoria: {
          tiposParticion: [
              { label: 'Particiones Fijas', value: 'fijas' },
              { label: 'Particiones Variables', value: 'variables' }
          ],
          tipoParticiones: null,
          algoritmosIntercambio: ['best fit', 'worst fit', 'first fit'],
          algoritmoIntercambio: null,
          particiones: []
      },
      cargaTrabajos: {
        procesos: []
      },
      colaNuevos: {
        procesos: []
      },
      colaListos: {
        procesos: []
      },
      colaBloqueados: {
        procesos: []
      },
  },
  getters: {
    getField,
    tamanoTotalParticiones({memoria}) {
      return memoria.particiones.reduce((ac, c) => ac + c.tamano, 0)
    },
    tamanoSOEnMemoria({simuladorConfig}) {
      if(!simuladorConfig.porcentajeUsoSO || !simuladorConfig.tamanoMemoria) return 0
      return Math.round(simuladorConfig.tamanoMemoria * simuladorConfig.porcentajeUsoSO / 100)
    },
    freeSpace({simuladorConfig}, {tamanoTotalParticiones, tamanoSOEnMemoria}) {
        if(!simuladorConfig.tamanoMemoria) return 0
        return simuladorConfig.tamanoMemoria - tamanoSOEnMemoria - tamanoTotalParticiones
    }
  },
  mutations: {
      updateField,
      runner,
      addParticion({memoria}) {
        memoria.particiones.push({
          id: memoria.particiones.length + 1,
          tamano: 0
        })
      },
      removeParticion({memoria}, idParticion) {
        memoria.particiones.splice(idParticion - 1, 1)
      },
      setCiclo({cargaTrabajos}, {idProceso, indexCiclo, key, value}) {
        cargaTrabajos.procesos.find(p=>p.id===idProceso).ciclos[indexCiclo][key] = value
      },
      removeCiclo({cargaTrabajos}, {idProceso, indexCiclo}) {
        cargaTrabajos.procesos.find(p=>p.id===idProceso).ciclos.splice(indexCiclo, 1)
      },
      addCiclo({cargaTrabajos}, {idProceso}) {
        cargaTrabajos.procesos.find(p=>p.id===idProceso).ciclos.push({
          tipo: null,
          tiempo: 0
        })
      },
      addProceso({cargaTrabajos}) {
        cargaTrabajos.procesos.push({
          id: cargaTrabajos.procesos.length + 1,
          tiempoArribo: 0,
          tamanoEnMemoria: 0,
          ciclos: []
        })
      },
      removeProceso({cargaTrabajos}, {index}) {
        cargaTrabajos.procesos.splice(index,1)
      }
  }
})
