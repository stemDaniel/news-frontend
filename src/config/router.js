import Vue from 'vue'
import VueRouter from 'vue-router'

import News from '@/components/news/News'

Vue.use(VueRouter)

const routes = [
    {
        name: 'newsBySection',
        path: '/:id/:title/:number',
        component: News
    },
    {
        name: 'news',
        path: '/',
        component: News
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
