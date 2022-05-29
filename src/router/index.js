import Vue from 'vue'
import VueRouter from 'vue-router'
import Brands from '../views/Brands.vue'
import Brand from '../views/Brand.vue'
import Model from '../views/Model.vue'
import Item from '../views/Item.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Brands',
        component: Brands
    },
    {
        path: '/:brand',
        name: 'Brand',
        component: Brand
    },
    {
        path: '/:brand/:model',
        name: 'Model',
        component: Model
    },
    {
        path: '/:brand/:model/:item',
        name: 'Item',
        component: Item
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
