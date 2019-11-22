export default {
    simuladorConfig: {
        algoritmos: [
          "FCFS",
          "prioridades",
          "round robin",
          "colas multinivel"
        ],
        algoritmo: null,
        tamanos: [32, 64, 128, 256, 512, 1024],
        tamanoMemoria: null,
        porcentajes: [5, 10, 15, 20],
        porcentajeUsoSO: null,
    },
    sistemaParticiones: {
        tiposParticion: [
            { label: 'Particiones Fijas', value: 'fijas' },
            { label: 'Particiones Variables', value: 'variables' }
        ],
        tipoParticiones: null,
        algoritmosIntercambio: ['best fit', 'worst fit', 'first fit'],
        algoritmoIntercambio: null,
        particiones: []
    },
    memoria: {
      particiones: []
    },
    cargaTrabajos: {
      procesos: []
    },
    colaNuevos: {
      procesos: []
    },
    colaBloqueados: {
      procesos: []
    },
    histories: {
      memoria: [],
      colaNuevos: [],
      colaBloqueados: [],
      procesos: []
    }
}