<template>
    <q-list>
        <q-expansion-item
        expand-separator
        icon="settings"
        label="Configuración del Simulador"
        group="sidebar"
        >
        <q-card>
            <q-card-section>
                <div class="q-gutter-md">
                    <q-select
                        outlined
                        :options="algoritmos"
                        v-model="algoritmo"
                        label="Algoritmo de Planificación"
                    />
                    <q-input
                        outlined
                        v-if="algoritmo === 'round robin'"
                        type="number"
                        v-model="quantum"
                        label="quantum"
                    />
                    <q-select
                        outlined
                        :options="tamanos"
                        v-model="tamanoMemoria"
                        label="Tamaño de Memoria"
                    />
                    <q-select
                        outlined
                        :options="porcentajes"
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
        group="sidebar"
        >
        <q-card>
            <q-card-section>
                <q-option-group
                    :options="tiposParticion"
                    type="radio"
                    v-model="tipoParticiones"
                />
            <q-separator />
            </q-card-section>
            <q-card-section>
                <q-select
                    outlined
                    :options="algoritmosIntercambio"
                    v-model="algoritmoIntercambio"
                    label="Algoritmo de Intercambio"
                />
            </q-card-section>
            <q-card-section v-if="tipoParticiones === 'fijas'">
                <q-list bordered separator>
                    <q-item dense v-for="(part, index) in particiones" :key="index">
                        <q-item-section>
                        <q-item-label overline>P{{ part.id }}</q-item-label>
                            <div>
                                <q-slider
                                    @change="val=>part.tamano=val"
                                    :value="part.tamano"
                                    :min="0"
                                    :max="tamanoMemoria"
                                    :step="1"
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
        group="sidebar"
        >
        <q-card>
            <q-card-section>
                Procesos
                <q-list bordered separator>
                    <q-expansion-item
                        v-for="(proc, index) in procesos"
                        :key="index"
                        switch-toggle-side
                    >
                        <template v-slot:header>
                            <q-item-section>
                                <q-item-label>proceso {{ proc.id }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-btn @click="removeProceso({index})" flat dense rounded size="sm" icon="delete" />
                            </q-item-section>
                        </template>
                        <q-item-section class="q-pa-sm q-gutter-sm">
                            <q-input
                                dense
                                type="number"
                                label="tiempo de arribo"
                                v-model="proc.tiempoArribo"
                            />
                            <q-input
                                dense
                                type="number"
                                label="tamaño del proceso"
                                v-model="proc.tamanoEnMemoria"
                            />
                            <q-input
                                dense
                                type="number"
                                label="prioridad (menor número, mayor prioridad)"
                                v-model="proc.prioridad"
                            />
                        </q-item-section>
                        <q-item-section >
                            ciclo de vida
                            <q-list dense bordered separator>
                                <q-item v-for="(ciclo, index) in proc.ciclos" :key="index">
                                    <q-item-section>
                                        <q-select
                                                dense
                                                :options="[
                                                    'irrupcion',
                                                    'io'
                                                ]"
                                                label="tipo"
                                                :value="ciclo.tipo"
                                                @input="(value) => setCiclo({
                                                    idProceso: proc.id, 
                                                    indexCiclo: index, 
                                                    key: 'tipo', 
                                                    value
                                                })"
                                            />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-input
                                                dense
                                                type="number"
                                                label="tiempo"
                                                :value="ciclo.tiempo"
                                                @input="(value) => setCiclo({
                                                    idProceso: proc.id, 
                                                    indexCiclo: index, 
                                                    key: 'tiempo', 
                                                    value: Number(value)
                                                })"
                                            />
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-btn 
                                            @click="removeCiclo({idProceso: proc.id,indexCiclo: index})" 
                                            size="xs" flat dense rounded icon="delete" 
                                        />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            <q-btn 
                                size="xs" @click="addCiclo({idProceso: proc.id})" 
                                label="agregar ciclo" outline class="q-mt-sm" color="primary" 
                            />
                        </q-item-section>
                    </q-expansion-item>
                </q-list>
            </q-card-section>
            <q-card-section>
                <q-btn outline color="primary" @click="addProceso" class="full-width" label="agregar proceso" />
            </q-card-section>
        </q-card>
        </q-expansion-item>

    </q-list>
</template>

<script>

import { mapMutations, mapState } from 'vuex'
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapFields([
            'simuladorConfig.algoritmo',
            'simuladorConfig.quantum',
            'simuladorConfig.tamanoMemoria',
            'simuladorConfig.porcentajeUsoSO',
            'sistemaParticiones.tipoParticiones',
            'sistemaParticiones.algoritmoIntercambio',
        ]),
        ...mapMultiRowFields([
            'sistemaParticiones.particiones',
            'cargaTrabajos.procesos'
        ]),
        ...mapState({
            'algoritmos': state => state.simuladorConfig.algoritmos,
            'tamanos': state => state.simuladorConfig.tamanos,
            'porcentajes': state => state.simuladorConfig.porcentajes,
            'tiposParticion': state => state.sistemaParticiones.tiposParticion,
            'algoritmosIntercambio': state => state.sistemaParticiones.algoritmosIntercambio,
        })

    },
    methods: {
        ...mapMutations([
            'addParticion',
            'removeParticion',
            'setCiclo',
            'removeCiclo',
            'addCiclo',
            'addProceso',
            'removeProceso'
        ])
    }
}
</script>