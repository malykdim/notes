import { createRouter, createWebHashHistory } from 'vue-router'

import { useAuthStore } from '../stores/storeAuth'

const Notes = () => import('../views/Notes.vue')
const Edit = () => import('../views/notes/EditNote.vue')
const Stats = () => import('../views/Stats.vue')
const Auth = () => import('../views/Auth.vue')

const routes = [
    {
        path: '/',
        name: 'notes',
        component: Notes
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: Edit
    },
    {
        path: '/stats',
        name: 'stats',
        component: Stats
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// beforeEach hook
router.beforeEach(async (to, from) => {
    const storeAuth = useAuthStore()
    console.log('to: ', to)
    if (!storeAuth.user.id && to.name !== 'auth') {
        return { name: 'auth' }
    }
    if (storeAuth.user.id && to.name === 'auth') {
        return false
    }
})

export default router