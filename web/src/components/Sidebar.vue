<template>
    <q-list>
        <q-expansion-item
        expand-separator
        icon="settings"
        label="Configuración del Simulador"
        >
        <q-card>
            <q-card-section>
                <div class="q-gutter-md">
                    <q-select
                        outlined
                        :options="[
                            'FCFS',
                            'Round Robin'
                        ]"
                        v-model="algoritmo"
                        label="Algoritmo de Planificación"
                    />
                    <q-select
                        outlined
                        :options="[
                            24,
                            48,
                            128
                        ]"
                        v-model="tamanoMemoria"
                        label="Tamaño de Memoria"
                    />
                    <q-select
                        outlined
                        :options="[
                            5,
                            10,
                            20
                        ]"
                        v-model="porcentajeUsoSO"
                        label="Porcentaje de Uso del S.O."
                    />
                </div>
            </q-card-section>
        </q-card>
        </q-expansion-item>

        <q-expansion-item
        expand-separator
        icon="settings"
        label="Sistema de Particiones"
        >
        <q-card>
            <q-card-section>
                <q-option-group
                    :options="particionesOptions"
                    type="radio"
                    v-model="tipoParticiones"
                />
            <q-separator />
            </q-card-section>
            <q-card-section>
                <q-select
                    outlined
                    :options="[
                        'best fit',
                        'worst fit',
                        'first fit'
                    ]"
                    v-model="algoritmoIntercambio"
                    label="Algoritmo de Intercambio"
                />
            </q-card-section>
            <q-card-section>
                <q-list bordered separator>
                    <q-item dense v-for="(part, index) in particiones" :key="index">
                        <q-item-section>
                        <q-item-label overline>P{{ part.id }}</q-item-label>
                            <div>
                                <!-- <q-select
                                    :options="[
                                        'best fit',
                                        'worst fit',
                                        'first fit'
                                    ]"
                                    dense
                                    v-model="algoritmoIntercambio"
                                    label="Tamaño"
                                /> -->
                                <q-slider
                                    @change="val=>part.tamano=val"
                                    :value="part.tamano"
                                    :min="0"
                                    :max="tamanoMemoria"
                                    :step="4"
                                    label
                                    color="light-blue"
                                />
                            </div>
                        </q-item-section>
                        <q-item-section side>
                            <q-btn flat rounded @click="removeParticion(index + 1)" icon="delete" outline dense size="xs" />
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-btn color="primary" @click="addParticion" outline class="full-width q-mt-sm" label="Agregar Partición" />
            </q-card-section>
        </q-card>
        </q-expansion-item>

        <q-expansion-item
        expand-separator
        icon="settings"
        label="Carga de Trabajos"
        >
        <q-card>
            <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
            </q-card-section>
        </q-card>
        </q-expansion-item>

    </q-list>
</template>

<script>

import { mapMutations } from 'vuex'
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'

export default {
    data() {
        return {
            particionesOptions: [
                { label: 'Particiones Fijas', value: 'fijas' },
                { label: 'Particiones Variables', value: 'variables' }
            ]
        }
    },
    computed: {
        // algoritmo: {
        //     get() {
        //         return this.$store.state.simuladorConfig.algoritmo
        //     },
        //     set(val) {
        //         this.setAlgoritmo(val)
        //     }
        // }
        ...mapFields([
            'simuladorConfig.algoritmo',
            'simuladorConfig.tamanoMemoria',
            'simuladorConfig.porcentajeUsoSO',
            'sistemaParticiones.tipoParticiones',
            'sistemaParticiones.algoritmoIntercambio',
            // 'sistemaParticiones.particiones',
        ]),
        ...mapMultiRowFields([
            'sistemaParticiones.particiones'
        ])
    },
    methods: {
        ...mapMutations([
            'addParticion',
            'removeParticion'
        ])
    }
}
</script>