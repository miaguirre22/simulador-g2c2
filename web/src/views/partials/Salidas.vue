<template>
    <div>
        <h6>Retorno Promedio: {{ retornoPromedio }}</h6>
    </div>
</template>


<script>
import { mapState } from "vuex"
export default {
    computed: {
        ...mapState({
            resultados: 'resultados'
        }),
        retornoPromedio() {
            return this.resultados.procesos.reduce((ac,c)=>ac + c.tiempoRetorno, 0)
            / this.resultados.procesos.length 
        }
    }
}
</script>