import Store from "../../store/index"
/**
 * 
 * 
 * 
 * 
 */
export default (state, counter) => {
     state.colaNuevos.procesos.sort((a,b) => {
        if(a.ta < b.ta) return -1
        else return 1
     })

     if(state.sistemaParticiones.tipoParticiones === 'fijas') {
         if(Store.getters.partitionsAvailable) {
            state.colaNuevos.procesos.forEach(p => {
               switch(state.sistemaParticiones.algoritmoIntercambio) {
                  case 'best fit': 
                     bestFitRoutine(state.memoria.particiones, p)
                     break
                  case 'worst fit':
                     worstFitRoutine(state.memoria.particiones, p)
                     break
                  case 'first fit':
                     firstFitRoutine(state.memoria.particiones, p)
                     break
   
              }
           })
         }
     } else {

     }
}


function bestFitRoutine(particiones, proceso) {
   console.log("BEST FIT ROUTINE RUNNING :D")
   particiones.sort((p1, p2) => {
      if(p1.space > p2.space) return 1
      else return -1
   })

   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
      ) {
         particiones[count].libre = false
         particiones[count].proceso = proceso
         break
      } else count++
   }

}

function worstFitRoutine(particiones, proceso) {
   particiones.sort((p1, p2) => {
      if(p1.space < p2.space) return 1
      else return -1
   })


   let count = 0
   while(count < particiones.length) {
      if(
         particiones[count].libre &&
         particiones[count].space >= proceso.tamanoEnMemoria
      ) {
         particiones[count].libre = false
         particiones[count].proceso = proceso
         break
      } else count++
   }
}

function firstFitRoutine(particiones, proceso) {
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
         particiones[count].libre = false
         particiones[count].proceso = proceso
         break
      } else count++
   }
}

