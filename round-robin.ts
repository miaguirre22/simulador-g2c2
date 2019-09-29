// procesos
class proceso {
    id: number;
    //nombre: string;
    tiempoArribo: number;
    ciclo: ciclo;
    tamaño: number;
    constructor(id:number, nombre:string, ta:number, ciclo: ciclo, tam:number) {
        this.id = id;
        //this.nombre = nombre;
        this.tiempoArribo = ta;
        this.ciclo = ciclo;
        this.tamaño = tam;
    }
}
