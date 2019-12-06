<template>
    <div class="fit row q-gutter-lg">
        <div class="col-md-4">
            <span>Mapa de Memoria</span>
            <q-list class="q-mt-lg" bordered separator>
            <q-item v-if="tamanoSOEnMemoria">
                <q-item-section>
                Sistema Operativo
                </q-item-section>
                <q-item-section side>
                {{ tamanoSOEnMemoria }} KB
                </q-item-section>
            </q-item>
            <q-item v-for="(part, index) in particiones" :key="index">
                <q-item-section>
                    Partición {{part.id}}
                </q-item-section>
                <q-item-section side>
                    {{part.tamano}} KB
                </q-item-section>
            </q-item>
            <q-item v-if="freeSpace">
                <q-item-section>
                Espacio Libre
                </q-item-section>
                <q-item-section side>
                {{ freeSpace }} KB
                </q-item-section>
            </q-item>
            </q-list>
        </div>
        <div class="col-md-7">
            Procesos
            <q-table
            flat
            bordered
            :data="procesos"
            :columns="[
                {
                name: 'idProcess',
                label: 'ID Proceso',
                align: 'center',
                field: row => row.id,
                format: val => `${val}`
                },
                {
                name: 'arribo',
                label: 'Tiempo de Arribo',
                align: 'center',
                field: row => row.tiempoArribo,
                format: val => `${val}`
                },
                {
                name: 'tamano',
                label: 'Tamaño',
                align: 'center',
                field: row => row.tamanoEnMemoria,
                format: val => `${val}`
                },
            ]"
            row-key="id"
            >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="idProcess" :props="props">
                    proceso {{ props.row.id }}
                    <q-btn dense round flat :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click="props.expand = !props.expand" />
                    </q-td>
                    <q-td key="arribo" :props="props">
                    {{ props.row.tiempoArribo }}
                    </q-td>
                    <q-td key="tamano" :props="props">
                    {{ props.row.tamanoEnMemoria }}
                    </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                    <span class="text-bold">ciclo de vida</span>
                    <div v-for="(c, index) in props.row.ciclos" :key="index" class="text-left">
                    {{ c.tipo }} - {{ c.tiempo }}
                    </div>
                </q-td>
                </q-tr>
            </template>

            </q-table>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
    computed: {
    ...mapGetters([
      'freeSpace',
      'tamanoSOEnMemoria'
    ]),
    ...mapState({
      particiones: state => state.sistemaParticiones.particiones,
      procesos: state => state.cargaTrabajos.procesos
    })
  }
}
</script>