import axios from 'axios'

export default {
    namespaced: true,
    state: {
        names: {},
        products: [],
        error: '',
    },
    getters: {
        // Возвращает массив из id групп с товарами
        // Используется для вывода заполненных групп в каталоге
        availableGroupIds(state) {
            const availableGroupIds = state.products.reduce((ids, product) =>
                ids.add(product.G), new Set());
            return Array.from(availableGroupIds);
        },

        // Возвращает объект, где ключ — id товара, значение — наименование товара
        // Используется для вывода наименований товаров в корзине
        indexedProductNames(state) {
            const indexedProductNames = {};
            for (const groupId in state.names) {
                const group = state.names[groupId];
                for (const productId in group.B) {
                    indexedProductNames[productId] = group.B[productId].N;
                }
            }
            return indexedProductNames;
        },

        // Возвращает объект с доступными (к покупке) товарами,
        // где ключ — id товара, значение — объект товара
        // Используется для:
        // — вывода данных товара в каталоге;
        // — вывода данных товара в корзине;
        // — подсчета итоговой соимости в корзине
        indexedProducts(state) {
            return state.products.reduce((acc, product) => {
                acc[product.T] = product;
                return acc;
            }, {});
        },
    },
    mutations: {
        setNames(state, names) {
            state.names = names;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setError(state, errorMsg) {
            state.error = errorMsg;
        }
    },
    actions: {
        fetchNames({ commit }) {
            return axios.get('/data/names.json')
                .then(response => {
                    commit('setNames', response.data);
                })
                .catch(error => {
                    const errorMsg = `Ошибка запроса наименований для групп и товаров`;
                    commit('setError', errorMsg);
                    console.error(`[vuex/catalog] > ${errorMsg} | ${error}`);
                    throw new Error(`${errorMsg} | ${error}`);
                });
        },
        fetchProducts({ commit }) {
            return axios.get('/data/data.json')
                .then(response => {
                    commit('setProducts', response.data.Value.Goods);
                })
                .catch(error => {
                    const errorMsg = `Ошибка запроса товаров`;
                    commit('setError', errorMsg);
                    console.error(`[vuex/catalog] > ${errorMsg} | ${error}`);
                    throw new Error(`${errorMsg} | ${error}`);
                });
        },
        resetError({ commit }) {
            commit('setError', '');
        }
    },
}