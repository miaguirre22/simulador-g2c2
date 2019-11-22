<template>
  <q-page>
    <div class="fit row q-pa-sm q-gutter-sm">
      <div class="col">
        <q-btn class="full-width" @click="run" outline color="primary">INICIAR</q-btn>
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
            <q-tab name="procesamiento" label="Procesamiento" />
            <q-tab name="movies" label="Resultados" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="entradas">
                <entradas />
            </q-tab-panel>

            <q-tab-panel name="procesamiento">
                <procesamiento />
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
import { mapMutations } from 'vuex'
export default {
  name: 'PageHome',
  data() {
    return {
      tab: 'entradas'
    }
  },
  computed: {
  },
  components: {
      Entradas: () => import('./partials/Entradas.vue'),
      Procesamiento: () => import('./partials/Procesamiento.vue')
  },
  methods: {
    ...mapMutations({
      run: 'runner'
    })
  }
}
</script>
