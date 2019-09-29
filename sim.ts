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
// proceso
class proceso {
    id: number;
    nombre: string;
    tiempoArribo: number;
    tiempoIrrupcion: number;
    tamaño: number;
    constructor(id:number, nombre:string, ta:number, ti:number, tam:number) {
        this.id = id;
        this.nombre = nombre;
        this.tiempoArribo = ta;
        this.tiempoIrrupcion = ti;
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
