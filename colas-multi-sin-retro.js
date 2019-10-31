module.exports =
function(procesos) {

    // defino 3 colas
    var colas = {
        alta: {
            algoritmo: "rr",
            quantum: 2,
            procesos: []
        },
        media: {
            algoritmo: "rr",
            quantum: 6,
            procesos: []
        },
        baja: {
            algoritmo: "fcfs",
            procesos: []
        }
    }

    // defino variables
    var unidadDeTiempo = 0
    var procesoEnEjecucion
    var colaBloqueados = []
    var lineaDeTiempoProcesos = []

    var colaListos = procesos.filter(p => p.ta == unidadDeTiempo)

    var colaFuturos = procesos.filter(p => p.ta > unidadDeTiempo)

    // ordeno la cola de procesos futuros por el tiempo de arribo
    colaFuturos.sort((a,b) => {
        if(a.ta < b.ta) return -1
    })

    console.log("Planificador de Colas Multinivel Sin Retroalimenteción")

    while(
        colaListos.length !== 0 ||
        colaBloqueados.length !== 0
    ){

        // ubico los procesos de la cola de listos segun su prioridad
        // 1: cola alta 2: cola media 3: cola baja
        // evaluar si luego de ubicar el proceso en la cola por su prioridad
        // sacar dicho procesos de la cola de listos
        colaListos.forEach(p => {
            if(p.prioridad == 1){
                colas.alta.procesos.push(p)
            }else if(p.prioridad == 2){
                colas.media.procesos.push(p)
            }else{
                colas.baja.procesos.push(p)
            }
        });

        // consulto las colas segun su prioridad
        // y obtengo la cola
        if(colas.alta.procesos){
            colaEnEjecucion = colas.alta
            cola = "alta"
        }else if(colas.media.procesos){
            colaEnEjecucion = colas.media
            cola = "media"
        }else{
            colaEnEjecucion = colas.baja
            cola = "baja"
        }

        // trato la colaEnEjecucion
        // las colas son apropiativas???

    }


}