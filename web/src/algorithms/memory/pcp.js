import Store from "../../store/index"
import { cloneDeep } from "lodash"
/**
 * 
 * 
 * 
 * 
 */
export default (state, counter) => {
     state.colaNuevos.procesos.sort((a,b) => {
      //   if(a.tiempoArribo < b.tiempoArribo) return -1
      //   else return 1
         return a.tiempoArribo - b.tiempoArribo
     })
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
            
        }
     }


     if(removeQueue.length) {
        removeQueue.forEach(id => {
            let proc = state.colaNuevos.procesos.findIndex(p=>p.id==id)
            state.colaNuevos.procesos.splice(proc, 1)
        })
     }

   // history
   state.histories.memoria.push({
      time: counter,
      snapshot: cloneDeep(state.memoria)
   })

}


function bestFitRoutine(particiones, proceso, counter) {
   particiones.sort((p1, p2) => {
      // if(p1.space > p2.space) return -1
      // else return 1
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

function worstFitRoutine(particiones, proceso, counter) {
   particiones.sort((p1, p2) => {
      // if(p1.space < p2.space) return 1
      // else return -1
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

function firstFitRoutine(particiones, proceso, counter) {
   particiones.sort((p1, p2) => {
      if(p1.id > p2.id) return 1
      else return -1
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
