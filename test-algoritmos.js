const fcfs = require('./fcfs')
const prioridades = require('./prioridades')
const rr = require('./round-robin')

proceso = function(id, ta, prioridad, ciclo) {
    this.id = id;
    this.ta = ta;
    this.prioridad = prioridad;
    this.ciclo = ciclo;
    // tiempo de desbloqueo absoluto del proceso, si corresponde
    this.tiempoDesbloqueo = null;
}

var p1 = new proceso(1, 0, 3, [
    {irrupcion: 3},
    {bloqueo: 3},
    {irrupcion: 2}
])
var p2 = new proceso(2, 1, 1, [
    {irrupcion: 1},
    {bloqueo: 2},
    {irrupcion: 5}
])
var p3 = new proceso(3, 2, 2, [
    {irrupcion: 4},
    {bloqueo: 2},
    {irrupcion: 5}
])

//const resultado = fcfs([p1, p2, p3]);
//const resultado = prioridades([p1, p2, p3]);
const resultado = rr([p1, p2, p3]);

console.log(resultado)