import Vue from 'vue'
import VueRouter from 'vue-router'
import Brands from '../views/Brands.vue'
import Brand from '../views/Brand.vue'
import Item from '../views/Item.vue'
import Items from '../views/Items.vue'
import Favorites from '../views/Favorites.vue'
import Compare from '../views/Compare.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

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
        path: '/test',
        name: 'Test',
        component: Test
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
    }
]

const router = new VueRouter({
    routes
})

export default router
