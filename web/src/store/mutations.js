import { updateField } from "vuex-map-fields"
import runner from '../algorithms/runner'

export default {
    updateField,
    runner,
    addParticion({sistemaParticiones}) {
      sistemaParticiones.particiones.push({
        id: sistemaParticiones.particiones.length + 1,
        tamano: 0
      })
    },
    removeParticion({sistemaParticiones}, idParticion) {
      sistemaParticiones.particiones.splice(idParticion - 1, 1)
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
        prioridad: 0,
        ciclos: []
      })
    },
    removeProceso({cargaTrabajos}, {index}) {
      cargaTrabajos.procesos.splice(index,1)
    }
}