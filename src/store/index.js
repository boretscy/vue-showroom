import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let YAppsShowroomMode = document.getElementById('YAppsShowroom').getAttribute('mode')
let YAppsShowroomBrand = document.getElementById('YAppsShowroom').getAttribute('brand')


export default new Vuex.Store({
    state: {
        apiUrl: 'https://apps.yug-avto.ru/API/get/cis/',
        apiToken: '34b5ac8b71018c0bc7e5c050ed90b243',

        viewMode: null,
        mode: YAppsShowroomMode || 'new',
        brand: YAppsShowroomBrand || null,

        global: {
            filter: null,
            brands: []
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
