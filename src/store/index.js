import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiUrl: 'https://apps.yug-avto.ru/API/get/cis/',
        apiToken: '34b5ac8b71018c0bc7e5c050ed90b243',
        settings: {
            countBrandsOnMain: 6
        },
        brands: null,
        brand: null
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
