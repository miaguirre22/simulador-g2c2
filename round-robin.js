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
    // cola procesos futuros: orden en base a el tiempo de arribo
    colaFuturos.sort((a,b) => {
        if(a.ta < b.ta) return -1
    })
    var procesoEnEjecucion
    var colaBloqueados = []
    var lineaDeTiempoProcesos = []
    const quantum = 4
    var q = quantum
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
            
            var procesoEnEjecucion = colaListos[0]
            
            // pone en el Gantt el ID del proceso, una sola vez
            if(lineaDeTiempoProcesos[lineaDeTiempoProcesos.length - 1] !== procesoEnEjecucion.id){
                lineaDeTiempoProcesos.push(procesoEnEjecucion.id)
            }

            procesoEnEjecucion.ciclo[0].irrupcion--
            q--

            // quantum - ciclo irrupccion            
            if(procesoEnEjecucion.ciclo[0].irrupcion === 0){
                procesoEnEjecucion.ciclo.splice(0,1)
                // ciclos bloqueo: proceso se agrega a la cola de bloqueados
                if(procesoEnEjecucion.ciclo.length) {
                    procesoEnEjecucion.tiempoDesbloqueo = unidadDeTiempo + procesoEnEjecucion.ciclo[0].bloqueo
                    colaBloqueados.push(colaListos.splice(0,1)[0])
                } else {
                    colaListos.splice(0,1)
                }
                
                // restauro el "q" quantum
                q = quantum

            }else{
                if(q === 0){
                    // lo saco de la cola de listos y lo coloco al final
                    colaListos.splice(0,1)
                    colaListos[colaListos.length] = procesoEnEjecucion
                }

                // restauro el "q" quantum
                q = quantum
            }
            
        }else{
            // no tengo procesos listos, pero si bloqueados - cuento una unidad de tiempo
            unidadDeTiempo++
        }
        
        // cola de procesos bloqueados
        colaBloqueados.forEach((p) => {
            if(p.tiempoDesbloqueo <= unidadDeTiempo) {  // podria cambiar <= por = ???
                p.ciclo.splice(0,1)
                colaListos.push(p)
            }
        })
        colaBloqueados = colaBloqueados.filter(p => {
            return p.tiempoDesbloqueo > unidadDeTiempo
        })

    }
    
    return {
        tiempoRetorno: unidadDeTiempo,
        gantt: lineaDeTiempoProcesos        
    }
}