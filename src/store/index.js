import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// let mode = document.getElementById('YAppsShowroom').getAttribute('mode')


export default new Vuex.Store({
    state: {
        apiUrl: 'https://apps.yug-avto.ru/API/get/cis/',
        apiToken: '34b5ac8b71018c0bc7e5c050ed90b243',
        settings: {
            countBrandsOnMain: 6
        },
        brands: [],
        brand: null,
        viewMode: null,
        modelItems: null,
        mode: 'new'
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
