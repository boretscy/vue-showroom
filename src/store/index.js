import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiUrl: 'https://apps.yug-avto.ru/API/get/cis/',
        apiToken: '34b5ac8b71018c0bc7e5c050ed90b243',
        filter: {
            viewFull: false,
            dropLists: {
                cities: [
                    {
                        text: 'Краснодар',
                        link: '#',
                        router: false
                    },
                    {
                        text: 'Яблоновский',
                        link: '#',
                        router: false
                    },
                    {
                        text: 'Новорорссийск',
                        link: '#',
                        router: false
                    },
                    {
                        text: 'Майкоп',
                        link: '#',
                        router: false
                    }
                ],
                mode: [
                    {
                        text: 'Новые',
                        link: 'https://ya.boretscy.space/cars/new/',
                        router: false
                    },
                    {
                        text: 'С пробегом',
                        link: 'https://ya.boretscy.space/cars/used/',
                        router: false
                    }
                ],
                brands: [
                    {
                        text: 'Cadillac',
                        link: 'cadillac',
                        router: true
                    }
                ],
                models: [
                    {
                        text: 'Granta',
                        link: 'cadillac/granta',
                        router: true
                    }
                ],
            },
            dropIndex: {
                cities: 0,
                mode: 0,
                brands: 0,
                models: 0,
            },
            ranges: {
                price: {
                    min: 0,
                    max: 9000000,
                    step: 10000
                }
            },
        },
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
