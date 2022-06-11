import Vue from 'vue'
import VueRouter from 'vue-router'
import Brands from '../views/Brands.vue'
import Brand from '../views/Brand.vue'
import Item from '../views/Item.vue'
import Items from '../views/Items.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Brands',
        component: Brands
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
    }
]

const router = new VueRouter({
    routes
})

export default router
