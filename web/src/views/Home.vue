<template>
  <q-page>
    <div class="fit row q-pa-sm q-gutter-sm">
      <div class="col">
        <q-btn class="full-width" outline color="primary">INICIAR</q-btn>
      </div>
      <div class="col">
        <q-btn class="full-width" outline color="primary">RESTAURAR</q-btn>
      </div>
    </div>

    <div class="fit row q-pa-sm q-mt-lg">
      <div class="col">
        <q-card flat bordered>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="entradas" label="Entradas" />
            <q-tab name="alarms" label="Procesamiento" />
            <q-tab name="movies" label="Resultados" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="entradas">
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
                          P{{part.id}}
                        </q-item-section>
                        <q-item-section side>
                          {{part.tamano}} KB
                        </q-item-section>
                    </q-item>
                    <q-item>
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
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>

import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PageHome',
  data() {
    return {
      tab: 'entradas'
    }
  },
  computed: {
    ...mapGetters([
      'freeSpace',
      'tamanoSOEnMemoria'
    ]),
    ...mapState({
      particiones: state => state.sistemaParticiones.particiones
    })
  }
}
</script>
