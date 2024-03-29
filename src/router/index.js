import Vue from 'vue'
import VueRouter from 'vue-router'
import Brands from '../views/Brands.vue'
import Brand from '../views/Brand.vue'
import Item from '../views/Item.vue'
import Items from '../views/Items.vue'
import Favorites from '../views/Favorites.vue'
import Compare from '../views/Compare.vue'
import Notfound from '../views/Notfound.vue'

Vue.use(VueRouter)

let YAppsShowroomMode = document.getElementById('YAppsShowroom').getAttribute('mode')
let YAppsShowroomHash = document.getElementById('YAppsShowroom').getAttribute('hash') || null
let YAppsShowroomPosition = { 
    x: 0, 
    y: document.getElementById('YAppsShowroom').getBoundingClientRect().top
}


const routes = [
    {
        path: '/',
        name: 'Brands',
        component: Brands
    },
    {
        path: '/compare',
        name: 'Compare',
        component: Compare
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
    },
    {
        path: '/filter',
        name: 'Items',
        component: Items
    },
    {
        path: '/:brand',
        name: 'Brand',
        component: Brand
    },
    {
        path: '/:brand/:model',
        name: 'Model',
        component: Items
    },
    {
        path: '/:brand/:model/:item',
        name: 'Item',
        component: Item
    },
    {
        path: '/404',
        alias: '*',
        component: Notfound
    },
]

const router = new VueRouter({
    base: '/cars/'+YAppsShowroomMode+'/',
    mode: ( YAppsShowroomHash ) ? null : 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        return YAppsShowroomPosition
    }
})

export default router
