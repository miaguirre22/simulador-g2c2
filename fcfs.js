/**
 * objetivo:
 * 1. mostrar gantt (cómo se planificó la CPU) 1,2,1,2
 * 2. mostrar métricas (tiempos de espera, rendimiento, retorno)
 * 
 */

proceso = function(id, estado, ta, ciclo) {
    this.id = id;
    this.estado = estado; // true listo, false bloqueado
    this.ta = ta;
    this.ciclo = ciclo;
    // tiempo de desbloqueo absoluto del proceso, si corresponde
    this.tiempoDesbloqueo = null;
}

var p1 = new proceso(1, true, 0, [
    {irrupcion: 3},
    {bloqueo: 3},
    {irrupcion: 2}
])
var p2 = new proceso(2, true, 1, [
    {irrupcion: 1},
    {bloqueo: 2},
    {irrupcion: 5}
])
var p3 = new proceso(3, true, 2, [
    {irrupcion: 4},
    {bloqueo: 2},
    {irrupcion: 5}
])


var colaListos = [p1, p2, p3]
var colaBloqueados = []

var unidadDeTiempo = 0
var lineaDeTiempoProcesos = []

while((colaListos.length !== 0) || (colaBloqueados.length !== 0)) {
    
    if(colaListos.length) {
        // orden en base a el tiempo de arribo
        colaListos.sort((a,b) => {
            if(a.ta < b.ta) return -1
        })
    
        var proceso = colaListos[0]
    
        unidadDeTiempo += proceso.ciclo[0].irrupcion
        lineaDeTiempoProcesos.push(proceso.id)
        proceso.ciclo.splice(0,1)
        if(proceso.ciclo.length) {
            proceso.estado = false
            proceso.tiempoDesbloqueo = unidadDeTiempo + proceso.ciclo[0].bloqueo
            colaBloqueados.push(colaListos.splice(0,1)[0])
        } else {
            colaListos.splice(0,1)
        }
    } else {
        unidadDeTiempo++
    }


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

// console.log(unidadDeTiempo)
// console.log(lineaDeTiempoProcesos)
