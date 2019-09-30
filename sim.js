var message = "Hello World";
console.log(message);
// types
var algoritmoPlanificacion; //string[] = ["FCFS", "Prioridades", "RR", "Colas Multinivel"]
var tamañoMemoria;
var sistemaOpertivo;
//var particion: boolean;
var algoritmoAsignacion; // string[] = ["Best-Fit", "Worst-Fit", "First-Fit"]
// class
// particion
var particion = /** @class */ (function () {
    function particion(nombre, tam) {
        this.nombre = nombre;
        this.tamaño = tam;
    }
    return particion;
}());
// simulador
var simulador = /** @class */ (function () {
    //particiones: particion;
    //procesos: proceso;
    function simulador(plan, tam, so, particion, inter) {
        this.planificador = plan;
        this.tamañoMemoria = tam;
        this.porcentajeSO = so;
        this.particionFija = particion;
        this.intercambio = inter;
        var disponible = this.tamañoMemoria - this.porcentajeSO;
        //while
    }
    return simulador;
}());
// ciclos
var ciclo = /** @class */ (function () {
    function ciclo(tipo, tiempo) {
        this.tipo = tipo;
        this.tiempo = tiempo;
    }
    return ciclo;
}());
// proceso
var proceso = /** @class */ (function () {
    //tamaño: number;
    function proceso(id, ta, ciclo) {
        this.id = id;
        //this.nombre = nombre;
        this.tiempoArribo = ta;
        this.ciclos = ciclo;
        //this.tamaño = tam;
    }
    return proceso;
}());
var p1 = new proceso(1, 5, [
    { tipo: "irrupcion", tiempo: 3 },
    { tipo: "bloqueo", tiempo: 3 },
    { tipo: "irrupcion", tiempo: 2 }
]);
var p2 = new proceso(2, 1, [
    { tipo: "irrupcion", tiempo: 1 },
    { tipo: "bloqueo", tiempo: 2 },
    { tipo: "irrupcion", tiempo: 5 }
]);
var p3 = new proceso(3, 2, [
    { tipo: "irrupcion", tiempo: 4 },
    { tipo: "bloqueo", tiempo: 2 },
    { tipo: "irrupcion", tiempo: 5 }
]);
var quantum = 4;
var unidadDeTiempo = 0;
var colaListos = [p1, p2, p3];
var colaBloqueados = [];
// console.log("colaListos: " + colaListos)
// console.log("colaBloqueados: " + colaBloqueados)
// console.log(p1.ciclos[0].tipo)
// ordenar cola de listos por tiempo de arribo
colaListos.sort(function (a, b) { return a.tiempoArribo - b.tiempoArribo; });
console.log(colaListos);
while (colaListos.length !== 0 || colaBloqueados.length !== 0) {
    if (colaListos.length) {
        // ordenar cola de listos por tiempo de arribo
        //colaListos.sort((a,b) => a.tiempoArribo - b.tiempoArribo)
        var proc = colaListos[0];
        if (proc.ciclos[0].tipo == "irrupcion" && proc.ciclos[0].tiempo >= quantum) {
            console.log("el proceso: " + proc.id + "es mayor que el quantum");
        }
    }
}
