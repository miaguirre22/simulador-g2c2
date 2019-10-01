/**
 * 
 * algoritmo de planificación Round Robin
 * 
 */
module.exports = 

/**
 * @typedef {any} Proceso
 * @prop {number} id 
 * @prop {number} ta tiempo de arribo
 * @prop {Ciclo[]} ciclo
 * 
 * @typedef {any} Ciclo
 * @prop {number} [irrupcion]
 * @prop {number} [bloqueo]
 * 
 * @param {Proceso[]} procesos
 * 
 */
function(procesos /* array */) {

    var unidadDeTiempo = 0
    var colaListos = procesos.filter(p => p.ta == unidadDeTiempo)
    var colaFuturos = procesos.filter(p => p.ta > unidadDeTiempo)    
    var procesoEnEjecucion
    var colaBloqueados = []
    var lineaDeTiempoProcesos = []
    var quantum = 4
    console.log("Algoritmo de planificación Round Robin")    

    while((colaListos.length !== 0) || (colaBloqueados.length !== 0)){
        
        /**
         * controlamos si un proceso llega a la memoria
         */
        colaFuturos.forEach(p => {
            if(p.ta === unidadDeTiempo) {
                colaListos.push(p)
            }
        })

        colaFuturos = colaFuturos.filter(p => {
            return p.ta > unidadDeTiempo
        })

        if(colaListos.length){
            
            unidadDeTiempo++
            
            // // orden en base a el tiempo de arribo
            // colaListos.sort((a,b) => {
            //     if(a.ta < b.ta) return -1
            // })
            //console.log(colaListos)
            
            var procesoEnEjecucion = colaListos[0]

            procesoEnEjecucion.ciclo[0].irrupcion--

            if(lineaDeTiempoProcesos[lineaDeTiempoProcesos.length - 1] === procesoEnEjecucion.id){
                lineaDeTiempoProcesos.push(procesoEnEjecucion.id)
            }



            // quantum - ciclo irrupccion            
            if(procesoEnEjecucion.ciclo[0].irrupcion == quantum){
                //if(procesoEnEjecucion.ciclo[0].irrupcion >= quantum){
                    unidadDeTiempo += quantum
                    procesoEnEjecucion.ciclo[0].irrupcion -= quantum
                    lineaDeTiempoProcesos.push(procesoEnEjecucion.id)
                    // lo saco de la cola de listos y lo coloco al final
                    colaListos.splice(0,1)
                    colaListos[colaListos.length] = procesoEnEjecucion
                    //colaListos.splice(colaListos.length,0,procesoEnEjecucion)
                    //console.log(colaListos, "cola")
    
            }else{
                unidadDeTiempo += procesoEnEjecucion.ciclo[0].irrupcion
                
                procesoEnEjecucion.ciclo.splice(0,1)   // saco el ciclo de la lista                
                //console.log(procesoEnEjecucion, "proceso")

                // ciclos bloqueo
                if(procesoEnEjecucion.ciclo.length){
                    procesoEnEjecucion.tiempoDesbloqueo = unidadDeTiempo + procesoEnEjecucion.ciclo[0].bloqueo
                    colaListos.splice(0,1)
                    colaBloqueados.push(procesoEnEjecucion)
                }else{
                    colaListos.splice(0,1)
                }
            }            
        }else{
            unidadDeTiempo++    // no tengo procesos listos, pero si bloqueados - cuento una unidad de tiempo
        }
        
        // // cola de procesos futuros
        // colaFuturos.forEach(
        //     (p) => {
        //         if(p.ta <= unidadDeTiempo){
        //             colaListos.push(p)
        //         }
        //     }
        // )
        // colaFuturos = colaFuturos.filter(
        //     p => {
        //         return p.ta > unidadDeTiempo
        //     }
        // )

        // cola de procesos bloqueados
        colaBloqueados.forEach(
            p => {
                if(p.tiempoDesbloqueo <= unidadDeTiempo){
                    p.ciclo.splice(0,1)
                    colaListos.push(p)
                }
            }
        )
        colaBloqueados = colaBloqueados.filter(
            p => {
                return p.tiempoDesbloqueo > unidadDeTiempo
            }
        )
    }
    
    return {
        tiempoRetorno: unidadDeTiempo,
        gantt: lineaDeTiempoProcesos        
    }
}