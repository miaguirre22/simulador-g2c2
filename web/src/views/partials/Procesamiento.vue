<template>
<div>
    <div class="fit row">
            <p style="display: block; width: 100%">gantt de procesos</p>
            <span v-for="(p, index) in histories.procesos" :key="index">
                <span v-if="p.snapshot">{{p.snapshot}}</span>
                <span v-else>X</span>
                --- 
            </span>
    </div>
    <div class="fit row">
        <p style="display: block; width: 100%">memoria</p>

        <!-- <span style="display: block; width: 100%" v-for="(i, index) in histories.memoria" :key="index">
            {{ index }}: 
            <span v-for="(j, index2) in i.snapshot.particiones" :key="index2">
                particion {{ j.id }} -> <b>{{ j.proceso ? j.proceso.id : 'X' }} </b>
            </span>
        </span> -->
        <div class="fit row">
            <q-list 
                v-for="(i, index) in histories.memoria" 
                :key="index" class="q-mt-lg" 
                bordered separator
                
            >
                <q-item v-for="(part, index2) in i.snapshot.particiones" :key="index2">
                    <q-item-section>
                        Partición {{part.id}}
                    </q-item-section>
                    <q-item-section side>
                        {{ part.proceso ? `proceso ` + part.proceso.id : '' }}
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </div>
</div>
</template>



<script>
import { mapState, mapGetters } from 'vuex'
import { isEqual } from 'lodash'

export default {
    computed: {
        ...mapState({
            'histories': 'histories'
        }),
        _memoria() {
            let array = []
            this.histories.memoria.forEach((m, index) => {
                if(index === 0) {
                    array.push(m)
                } else {
                     console.log(m.snapshot.particiones.map(p => {
                         console.log(p)
                         if(p.hasOwnProperty('proceso') && p.proceso) {
                            return p.proceso.id
                         } else {
                             return null
                         }
                     }))
                    let p1 = 
                    m.snapshot.particiones.map(p => {
                        if(p.hasOwnProperty('proceso') && p.proceso) {
                            return p.proceso.id
                        } else {
                            return null
                        }
                    });
                    let p2 = 
                        this.histories.memoria[index - 1].particiones
                        .map(p => {
                            if(p.hasOwnProperty('proceso') && p.proceso) {
                                return p.proceso.id
                            } else {
                                return null
                            }
                        });
                        
                    if(
                        isEqual(
                            p1,
                            p2
                        )
                    ) {
                        array.push(m)
                    }
                }
            })
            return array
        }
    }

}
</script>