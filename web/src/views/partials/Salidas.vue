<template>
    <div>
        <p class="text-h5">Corrida actual</p>
        <p class="text-h6">Retorno Promedio: {{ retornoPromedio }}</p>
        <p class="text-h6">Espera Promedio: {{ esperaPromedio }}</p>
        <div class="q-mt-xl">
            <p>Corridas</p>
            <hr>
            <div 
                v-for="({simuladorConfig, cargaTrabajos, sistemaParticiones, retornoPromedio, esperaPromedio }, index) in corridas" 
                :key="index"
                @click="setCorrida(index)"
                class="cursor-pointer q-my-sm"
            >
                <span class="text-bold">corrida {{ index + 1 }}:</span>
                <span> {{ simuladorConfig.algoritmo }} - {{ simuladorConfig.tamanoMemoria }}KB</span>
                <span> - particiones {{ sistemaParticiones.tipoParticiones }} - algoritmo {{ sistemaParticiones.algoritmoIntercambio }} </span>
                <span> - {{ cargaTrabajos.procesos.length }} trabajos </span>
                <span class="text-bold"> - retorno promedio: {{ retornoPromedio }} </span>
                <span class="text-bold"> - espera promedio: {{ esperaPromedio }} </span>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState, mapMutations } from "vuex"
export default {
    methods: {
        ...mapMutations({
            'setCorridaMut': 'setCorrida' 
        }),
        setCorrida(index) {
            console.log(this.corridas[index])
            this.setCorridaMut(this.corridas[index])
        },
    },
    computed: {
        ...mapState({
            resultados: 'resultados'
        }),
        retornoPromedio() {
            return this.resultados.procesos.reduce((ac,c)=>ac + c.tiempoRetorno, 0)
            / this.resultados.procesos.length 
        },
        esperaPromedio() {
            return this.resultados.procesos.reduce((ac,c)=>ac + c.tiempoEspera, 0)
            / this.resultados.procesos.length 
        },
        corridas() {
            return JSON.parse(localStorage.getItem('runs'))
        },
    }
}
</script>