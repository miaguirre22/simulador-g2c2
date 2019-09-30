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
    var colaFuturos = procesos.filter(p => p.ta > unidadDeTiempo)
    var colaListos = procesos.filter(p => p.ta == unidadDeTiempo)
    var colaBloqueados = []
    var lineaDeTiempoProcesos = []
    var quantum = 4

    while((colaListos.length !== 0) || (colaBloqueados.length !== 0)){
        
        if(colaListos.length){
            // orden en base a el tiempo de arribo
            colaListos.sort((a,b) => {
                if(a.ta < b.ta) return -1
            })
            //console.log(colaListos)
            
            var proceso = colaListos[0]

            // quantum - ciclo irrupccion            
            if(proceso.ciclo[0].irrupcion >= quantum){
                unidadDeTiempo += quantum
                proceso.ciclo[0].irrupcion -= quantum
                lineaDeTiempoProcesos.push(proceso.id)
                // lo saco de la cola de listos y lo agrego al final
                colaListos.splice(0,1)
                colaListos.push(proceso)
            }else{
                unidadDeTiempo += proceso.ciclo[0].irrupcion
                proceso.ciclo.splice(0,1)   // saco el ciclo de la lista                
                
                // ciclos bloqueo
                if(proceso.ciclo.length){
                    proceso.tiempoDesbloqueo = unidadDeTiempo + proceso.ciclo[0].bloqueo                    
                    colaBloqueados.push(colaListos.slice(0,1))
                }else{
                    colaListos.splice(0,1)
                }
            }                        

            // // ciclos bloqueo
            // if(proceso.ciclo.length){
            //     proceso.tiempoDesbloqueo = unidadDeTiempo + proceso.ciclo[0].bloqueo
            //     colaBloqueados.push(proceso)
            // }else{
            //     colaListos.slice(0,1)
            // }
        }else{
            unidadDeTiempo++    // no tengo procesos listos, pero si bloqueados - cuento una unidad de tiempo
        }
        
        // cola de procesos futuros
        colaFuturos.forEach(
            (p) => {
                if(p.ta <= unidadDeTiempo){
                    colaListos.push(p)
                }
            }
        )
        colaFuturos = colaFuturos.filter(
            p => {
                return p.ta > unidadDeTiempo
            }
        )

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