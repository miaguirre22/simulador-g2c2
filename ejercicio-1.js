const fcfs = require('./fcfs')
const prioridades = require('./prioridades')
const rr = require('./round-robin')
const niveles = require('./colas-multinivel')

// estructura de datos de un proceso
proceso = function(id, ta, prioridad, ciclo) {
    this.id = id;
    this.ta = ta;
    this.prioridad = prioridad;
    this.ciclo = ciclo;
    // tiempo de desbloqueo absoluto del proceso, si corresponde
    this.tiempoDesbloqueo = null;
}
// carga de trabajo
var p1 = new proceso(1, 0, 3, [
    {irrupcion: 5},

])
var p2 = new proceso(2, 0, 1, [
    {irrupcion: 4},

])
var p3 = new proceso(3, 0, 2, [
    {irrupcion: 10},

])
var p4 = new proceso(4, 1, 4, [
    {irrupcion: 3},

])
var p5 = new proceso(5, 2, 5, [
    {irrupcion: 2},

])
var p6 = new proceso(6, 3, 6, [
    {irrupcion: 10},

])
var p7 = new proceso(7, 4, 7, [
    {irrupcion: 5},

])
var p8 = new proceso(8, 5, 8, [
    {irrupcion: 5},

])

//const resultado = fcfs([p1,p2,p3, p4, p5, p6, p7, p8])
//const resultado = prioridades([p1,p2,p3, p4, p5, p6, p7, p8])
//const resultado = rr([p1,p2,p3, p4, p5, p6, p7, p8])
const resultado = niveles([p1, p2, p3, p4, p5, p6, p7, p8])

console.log(resultado)