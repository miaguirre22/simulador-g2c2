/**
 * 
 * algoritmo de planificación por prioridades
 * 
 */
module.exports = 

/**
 * @typedef {any} Proceso
 * @prop {number} id 
 * @prop {number} ta tiempo de arribo
 * @prop {number} prioridad
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
    
    while((colaListos.length !== 0) || (colaBloqueados.length !== 0)) {
        
        if(colaListos.length) {
            // orden en base a la prioridad
            colaListos.sort((a,b) => {
                if(a.prioridad < b.prioridad) return -1
                else return 1
            })
        
            var proceso = colaListos[0]
        
            unidadDeTiempo += proceso.ciclo[0].irrupcion
            lineaDeTiempoProcesos.push(proceso.id)
            proceso.ciclo.splice(0,1)
            if(proceso.ciclo.length) {
                proceso.tiempoDesbloqueo = unidadDeTiempo + proceso.ciclo[0].bloqueo
                colaBloqueados.push(colaListos.splice(0,1)[0])
            } else {
                colaListos.splice(0,1)
            }
        } else {
            unidadDeTiempo++
        }
    
        colaFuturos.forEach((p) => {
            if(p.ta <= unidadDeTiempo) {
                colaListos.push(p)
            }
        })
        colaFuturos = colaFuturos.filter(p => {
            return p.ta > unidadDeTiempo
        })
    
        colaBloqueados.forEach((p) => {
            if(p.tiempoDesbloqueo <= unidadDeTiempo) {
                p.ciclo.splice(0,1)
                colaListos.push(p)
            }
        })
        colaBloqueados = colaBloqueados.filter(p => {
            return p.tiempoDesbloqueo > unidadDeTiempo
        })
    }
    
    //  console.log(unidadDeTiempo)
    //  console.log(lineaDeTiempoProcesos)
    return {
        tiempoRetorno: unidadDeTiempo,
        gantt: lineaDeTiempoProcesos
    }
}

