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
        modeOptions: {
            new: {
                code: 'new',
                name: 'Новые автомобили'
            },
            used: {
                code: 'used',
                name: 'Автомобили с пробегом'
            }
        },
        brand: YAppsShowroomBrand || null,

        global: {
            filter: null,
            brands: [],
            cta: [
                {
                    name: 'random_cta',
                    code: 'credit',
                    title: 'Рассчитайте ежемесячный платеж',
                    button: 'Получить одобрение'
                },
                {
                    name: 'random_cta',
                    code: 'trade-in',
                    title: 'Обменяйте автомобиль в Trade-in',
                    button: 'Оценить онлайн'
                },
                {
                    name: 'random_cta',
                    code: 'sell',
                    title: 'Продайте текущий автомобиль',
                    button: 'Продать автомобиль'
                },
                {
                    name: 'random_cta',
                    code: 'select',
                    title: 'Не знаете, какой автомобиль выбрать?',
                    button: 'Подберите автомобиль'
                }
            ]
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
