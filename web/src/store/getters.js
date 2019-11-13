import { getField } from "vuex-map-fields"

export default {
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
    },
    partitionsAvailable({memoria}) {
      return !!(memoria.particiones.find(p => p.libre))
    }
  }