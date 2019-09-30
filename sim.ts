var message:string = "Hello World" 
console.log(message)

// types
var algoritmoPlanificacion: string; //string[] = ["FCFS", "Prioridades", "RR", "Colas Multinivel"]
var tamañoMemoria: number;
var sistemaOpertivo: number;
//var particion: boolean;
var algoritmoAsignacion: string; // string[] = ["Best-Fit", "Worst-Fit", "First-Fit"]

// types
type TipoParticion = {
    nombre: string,
    tamaño: number
}

// interfaces
interface InterfaceParticion {
    nombre: string,
    tamaño: number
}

// class
// particion
class particion {
    nombre: string;
    tamaño: number;
    constructor(nombre:string, tam:number) {
        this.nombre = nombre;
        this.tamaño = tam;        
    }
}

// simulador
class simulador {
    planificador: string;
    tamañoMemoria: number;
    porcentajeSO: number;
    particionFija: boolean;
    intercambio: string;
    //particiones: particion;
    //procesos: proceso;
    constructor(plan:string, tam:number, so:number, particion:boolean, inter:string) {
        this.planificador = plan;
        this.tamañoMemoria = tam;
        this.porcentajeSO = so;
        this.particionFija = particion;
        this.intercambio = inter;
        let disponible = this.tamañoMemoria - this.porcentajeSO;
        //while
    }
}

// ciclos
class ciclo {
    tipo: string;
    tiempo: number;
    constructor(tipo: string, tiempo: number) {
        this.tipo = tipo;
        this.tiempo = tiempo
    }
}
// proceso
class proceso {
    id: number;
    //nombre: string;
    tiempoArribo: number;
    ciclos: ciclo[];
    //tamaño: number;
    constructor(id:number, ta:number, ciclo:ciclo[]) {
        this.id = id;
        //this.nombre = nombre;
        this.tiempoArribo = ta;
        this.ciclos = ciclo;
        //this.tamaño = tam;
    }
}

var p1 = new proceso(1, 5, [
    {tipo: "irrupcion", tiempo: 3},
    {tipo: "bloqueo", tiempo: 3},
    {tipo:"irrupcion", tiempo: 2}
])
var p2 = new proceso(2, 1, [
    {tipo: "irrupcion", tiempo: 1},
    {tipo: "bloqueo", tiempo: 2},
    {tipo:"irrupcion", tiempo: 5}
])
var p3 = new proceso(3, 2, [
    {tipo: "irrupcion", tiempo: 4},
    {tipo: "bloqueo", tiempo: 2},
    {tipo:"irrupcion", tiempo: 5}
])

var quantum: number = 4
var unidadDeTiempo: number = 0
var colaListos = [p1, p2, p3]
var colaBloqueados: proceso[] = []
// console.log("colaListos: " + colaListos)
// console.log("colaBloqueados: " + colaBloqueados)
// console.log(p1.ciclos[0].tipo)

// ordenar cola de listos por tiempo de arribo
colaListos.sort((a,b) => a.tiempoArribo - b.tiempoArribo)
console.log(colaListos)

while(colaListos.length !== 0 || colaBloqueados.length !== 0){
    
    if(colaListos.length){
        // ordenar cola de listos por tiempo de arribo
        //colaListos.sort((a,b) => a.tiempoArribo - b.tiempoArribo)

        var proc: proceso = colaListos[0]

        if(proc.ciclos[0].tipo == "irrupcion" && proc.ciclos[0].tiempo >= quantum){
            console.log("el proceso: " + proc.id + "es mayor que el quantum")
        }
        

    }
}