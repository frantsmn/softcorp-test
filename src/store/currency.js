export default {
    namespaced: true,
    state: () => ({
        rubCurrency: 80
    }),
    mutations: {
        setRubCurrency(state) {
            state.rubCurrency = Math.floor(Math.random() * (80 - 20) + 20);
        }
    },
    actions: {
        updateCurrency({ commit }) {
            commit('setRubCurrency');
        }
    }
}