import Store from "../../store/index"
import { cloneDeep } from "lodash"


/**
 * 
 * toma los procesos de la cola de nuevos, siguiendo
 * el algoritmo de planificación elegido
 * y los lleva a la cola de listos (memoria)
 */
export default (state, counter) => {

      // se ordenan los procesos por orden de llegada
      state.colaNuevos.procesos.sort((a,b) => {
            return a.tiempoArribo - b.tiempoArribo
      })

      // variable temporal donde se guardan los procesos que se agregaron a la
      // cola de listos (memoria)
      let removeQueue = []
      if(Store.getters.partitionsAvailable) {

         if(state.sistemaParticiones.tipoParticiones === 'fijas') {
               state.colaNuevos.procesos.forEach(p => {
                  switch(state.sistemaParticiones.algoritmoIntercambio) {
                     case 'best fit': 
                        if(bestFitRoutine(state.memoria.particiones, p, counter)) {
                           // removeNuevo(state, p)
                           removeQueue.push(p.id)
                        }
                        break
                     case 'worst fit':
                        if(worstFitRoutine(state.memoria.particiones, p, counter)) {
                           removeQueue.push(p.id)
                        }
                        break
                     case 'first fit':
                        if(firstFitRoutine(state.memoria.particiones, p, counter)) {
                           removeQueue.push(p.id)
                        }
                        break
      
                  }
               })
         } else {
            state.colaNuevos.procesos.forEach(p => {
               switch(state.sistemaParticiones.algoritmoIntercambio) {
                  case 'best fit': 
                     if(bestFitRoutineVariables(state.memoria.particiones, p, counter)) {
                        removeQueue.push(p.id)
                     }
                     break
                  case 'worst fit':
                     if(worstFitRoutineVariables(state.memoria.particiones, p, counter)) {
                        removeQueue.push(p.id)
                     }
                     break
                  case 'first fit':
                     if(firstFitRoutineVariables(state.memoria.particiones, p, counter)) {
                        removeQueue.push(p.id)
                     }
                     break

               }
            })
         }
      }

      // se sacan los procesos que se agregaron a memoria de la cola de nuevos
      if(removeQueue.length) {
         removeQueue.forEach(id => {
               let procIndex = state.colaNuevos.procesos.findIndex(p=>p.id==id)
               state.colaNuevos.procesos.splice(procIndex, 1)
         })
      }

   // history
   state.histories.memoria.push({
      time: counter,
      snapshot: cloneDeep(state.memoria)
   })

}

// Boolean
function bestFitRoutine(particiones, proceso, counter) {
   // se ordenan las particiones por tamaño de menor a mayor 
   particiones.sort((p1, p2) => {
      return p1.space - p2.space
   })

   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
         ) {
         proceso.tiempoArriboListos = counter
         particiones[count].libre = false
         particiones[count].proceso = proceso
         // break
         return true
      } else count++
   }
   return false
}

// Boolean
function bestFitRoutineVariables(particiones, proceso, counter) {
   // se ordenan las particiones por tamaño de menor a mayor
   particiones.sort((p1, p2) => {
      return p1.space - p2.space
   })
   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
         ) {
         proceso.tiempoArriboListos = counter
         particiones[count].libre = false
         particiones[count].proceso = proceso
         let remainingSpace = particiones[count].space - proceso.tamanoEnMemoria
         particiones[count].space = Number(proceso.tamanoEnMemoria)
         
         // se ordenan las particiones por ID
         particiones.sort((p1, p2) => {
            return p1.id - p2.id
         })

         // se verifica que hay espacio remanente por el cual es
         // necesario crear una nueva partición
         if(remainingSpace > 0) {

            // se corren los IDs para colocar la partición nueva
            particiones.forEach((p, index) => {
               if(index > count) {
                  p.id++
               }
            })
            
            particiones.push({
               id: particiones[count].id + 1, 
               libre: true, 
               space: remainingSpace
            })
         }
         
         
         // break
         return true
      } else count++
   }
   return false

}
// Boolean
function worstFitRoutine(particiones, proceso, counter) {
   // se ordenan las particiones por tamaño de mayor a menor
   particiones.sort((p1, p2) => {
      return p2.space - p1.space
   })


   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
      ) {
         proceso.tiempoArriboListos = counter
         particiones[count].libre = false
         particiones[count].proceso = proceso
         // break
         return true
      } else count++
   }
   return false
}

// Boolean
function worstFitRoutineVariables(particiones, proceso, counter) {
   particiones.sort((p1, p2) => {
      return p2.space - p1.space
   })
   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
         ) {
         proceso.tiempoArriboListos = counter
         particiones[count].libre = false
         particiones[count].proceso = proceso
         let remainingSpace = particiones[count].space - proceso.tamanoEnMemoria
         particiones[count].space = Number(proceso.tamanoEnMemoria)
         
         particiones.sort((p1, p2) => {
            return p1.id - p2.id
         })

         particiones.forEach((p, index) => {
            if(index > count) {
               p.id++
            }
         })

         if(remainingSpace > 0) {
            particiones.push({
               id: particiones[count].id + 1, 
               libre: true, 
               space: remainingSpace
            })
         }
         
         // break
         return true
      } else count++
   }
   return false

}
// Boolean
function firstFitRoutine(particiones, proceso, counter) {
   // se ordenan las particiones por ID de partición
   particiones.sort((p1, p2) => {
      return p1.id - p2.id
   })

   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
      ) {
         proceso.tiempoArriboListos = counter
         particiones[count].libre = false
         particiones[count].proceso = proceso
         // break
         return true
      } else count++
   }
   return false
}
// Boolean
function firstFitRoutineVariables(particiones, proceso, counter) {
   particiones.sort((p1, p2) => {
      return p1.id - p2.id
   })
   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
         ) {
         proceso.tiempoArriboListos = counter
         particiones[count].libre = false
         particiones[count].proceso = proceso
         let remainingSpace = particiones[count].space - proceso.tamanoEnMemoria
         particiones[count].space = Number(proceso.tamanoEnMemoria)
         
         particiones.sort((p1, p2) => {
            return p1.id - p2.id
         })

         particiones.forEach((p, index) => {
            if(index > count) {
               p.id++
            }
         })

         if(remainingSpace > 0) {
            particiones.push({
               id: particiones[count].id + 1, 
               libre: true, 
               space: remainingSpace
            })
         }
         
         // break
         return true
      } else count++
   }
   return false

}
