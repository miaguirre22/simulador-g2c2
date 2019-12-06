/**
 * ordena las particiones por ID.
 */
export default (state) => {
    state.histories.memoria.forEach(m => {
        m.snapshot.particiones.sort((a, b) => {
            if(a.id - b.id < 0) return -1
            else return 1
        })
    })
}