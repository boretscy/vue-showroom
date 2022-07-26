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
                    code: 'offer',
                    title: 'Не знаете, какой автомобиль выбрать?',
                    button: 'Подберите автомобиль'
                }
            ],
            personalLink: '/about/personal-data-permission.php',
            politicLink: '/about/personal-data-policy.php',

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },

            selectedVehicle: null,
            selectedVehicleName: '',

            forms: [
                {
                    name: 'offer',
                    title: 'Получить предложение',
                    description: 'Оставьте ваши контакты, и мы свяжемся с Вами в ближайшее время.',
                    button: 'Отправить',
                    fields: [
                        {
                            name: 'name',
                            label: 'Имя',
                            required: true,
                            placeholder: 'Представьтесь',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'phone',
                            label: 'Телефон',
                            required: true,
                            placeholder: '+7 (___) ___-__-__',
                            type: 'phone',
                            error: false,
                            value: null
                        }
                    ],
                    rulesCheck: true,
                    use_vehicle: true,
                    statuses: {
                        sended: false,
                        success: false
                    }
                },
                {
                    name: 'credit',
                    title: 'Заявка на кредит',
                    description: 'Рассчитаем персональное предложение по кредиту.',
                    button: 'Отправить',
                    fields: [
                        {
                            name: 'name',
                            label: 'Имя',
                            required: true,
                            placeholder: 'Представьтесь',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'phone',
                            label: 'Телефон',
                            required: true,
                            placeholder: '+7 (___) ___-__-__',
                            type: 'phone',
                            error: false,
                            value: null
                        }
                    ],
                    rulesCheck: true,
                    use_vehicle: true,
                    statuses: {
                        sended: false,
                        success: false
                    }
                },
                {
                    name: 'trade-in',
                    title: 'Обменять автомобиль по программе Trade-In',
                    description: 'Мы подберем удобный вариант продажи вашего автомобиля',
                    button: 'Отправить',
                    fields: [
                        {
                            name: 'name',
                            label: 'Имя',
                            required: true,
                            placeholder: 'Представьтесь',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'phone',
                            label: 'Телефон',
                            required: true,
                            placeholder: '+7 (___) ___-__-__',
                            type: 'phone',
                            error: false,
                            value: null
                        },
                        {
                            name: 'car',
                            label: 'Марка и модель',
                            required: true,
                            placeholder: 'Марка и модель',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'year',
                            label: 'Год выпуска',
                            required: true,
                            placeholder: 'Год выпуска',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'condition',
                            label: 'Состояние',
                            required: false,
                            placeholder: 'Состояние',
                            type: 'text',
                            error: false,
                            value: null
                        }
                    ],
                    rulesCheck: true,
                    use_vehicle: false,
                    statuses: {
                        sended: false,
                        success: false
                    }
                },
                {
                    name: 'sell',
                    title: 'Продать автомобиль',
                    description: 'Мы подберем удобный вариант продажи вашего автомобиля',
                    button: 'Отправить',
                    fields: [
                        {
                            name: 'name',
                            label: 'Имя',
                            required: true,
                            placeholder: 'Представьтесь',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'phone',
                            label: 'Телефон',
                            required: true,
                            placeholder: '+7 (___) ___-__-__',
                            type: 'phone',
                            error: false,
                            value: null
                        },
                        {
                            name: 'car',
                            label: 'Марка и модель',
                            required: true,
                            placeholder: 'Марка и модель',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'year',
                            label: 'Год выпуска',
                            required: true,
                            placeholder: 'Год выпуска',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'condition',
                            label: 'Состояние',
                            required: false,
                            placeholder: 'Состояние',
                            type: 'text',
                            error: false,
                            value: null
                        }
                    ],
                    rulesCheck: true,
                    use_vehicle: false,
                    statuses: {
                        sended: false,
                        success: false
                    }
                },
                {
                    name: 'evaluation',
                    title: 'Оценим ваш автомобиль',
                    description: 'Укажите свой автомобиль и получите его оценочную стоимость.',
                    button: 'Отправить',
                    fields: [
                        {
                            name: 'name',
                            label: 'Имя',
                            required: true,
                            placeholder: 'Представьтесь',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'phone',
                            label: 'Телефон',
                            required: true,
                            placeholder: '+7 (___) ___-__-__',
                            type: 'phone',
                            error: false,
                            value: null
                        },
                        {
                            name: 'car',
                            label: 'Марка и модель',
                            required: true,
                            placeholder: 'Марка и модель',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'year',
                            label: 'Год выпуска',
                            required: true,
                            placeholder: 'Год выпуска',
                            type: 'text',
                            error: false,
                            value: null
                        },
                        {
                            name: 'condition',
                            label: 'Состояние',
                            required: false,
                            placeholder: 'Состояние',
                            type: 'text',
                            error: false,
                            value: null
                        }
                    ],
                    rulesCheck: true,
                    use_vehicle: false,
                    statuses: {
                        sended: false,
                        success: false
                    }
                }
            ]
        },
        
        city: localStorage.getItem('YAPP_SELECTED_CITY') || null,
        inCity: null,

        dealership: null
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
