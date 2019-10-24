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
      }
  },
  getters: {
    getField,
    lastPartitionId({sistemaParticiones}) {
      return sistemaParticiones.particiones.length
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
