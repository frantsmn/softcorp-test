export default {
    namespaced: true,
    state: {
        positions: [],
    },
    getters: {
        isCartEmpty(state) {
            return !state.positions.length;
        },
        totalPrice(state, getters, rootState, rootGetters) {
            return state.positions.reduce((totalPrice, position) => {
                // для каждой позиции по id товара находит товар
                const product = rootGetters['catalog/indexedProducts'][position.productId];
                // суммирует произведение его стоимости на кол-во
                return product ? totalPrice += product.C * position.amount : totalPrice;
            }, 0);
        },
    },
    mutations: {
        addProduct(state, productId) {
            const position = state.positions.find(position => position.productId === productId);
            // Если позиции с id добавлемого товара не существует
            if (!position) {
                // добавить позицию
                state.positions.push({ productId, amount: 1 });
            // Если позиция с id добавлемого товара существует
            } else {
                // увеличить кол-во в позиции (в пределах доступного кол-ва товара)
                const product = this.getters['catalog/indexedProducts'][productId];
                if (position.amount >= product.P) return
                position.amount++;
            }
        },
        removeProduct(state, productId) {
            state.positions = state.positions.filter(position =>
                position.productId !== productId
            )
        }
    }
}