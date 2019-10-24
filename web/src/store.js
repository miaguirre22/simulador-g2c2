import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      simuladorConfig: {
          algoritmo: null,
          tamanoMemoria: null,
          porcentajeUsoSO: null,
      },
      sistemaParticiones: {
          tipoParticiones: null,
          algoritmoIntercambio: null,
          particiones: [
              {
                  id: 1,
                  tamano: 0
              },
              {
                  id: 2,
                  tamano: 0
              }
          ]
      },
      memoria: {
        particiones: []
      }
  },
  getters: {
    getField,
    tamanoTotalParticiones({sistemaParticiones}) {
      return sistemaParticiones.particiones.reduce((ac, c) => ac + c.tamano, 0)
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
      addParticion({sistemaParticiones}) {
        sistemaParticiones.particiones.push({
          id: sistemaParticiones.particiones.length + 1,
          tamano: 0
        })
      },
      removeParticion({sistemaParticiones}, idParticion) {
        sistemaParticiones.particiones.splice(idParticion - 1, 1)
      }
  }
})
