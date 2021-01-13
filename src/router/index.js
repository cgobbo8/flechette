import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/Createteam.vue'
import TeamFight from '../views/TeamFight.vue'
import Fight from '../views/Fight.vue'
import BigFight from '../views/BigFight.vue'
import Training from '../views/Training.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/createteam',
        name: 'CreateTeam',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About
    },
    {
        path: '/TeamFight',
        name: 'TeamFight',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: TeamFight
    },
    {
        path: '/Fight',
        name: 'Fight',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Fight
    }, {
        path: '/BigFight',
        name: 'BigFight',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: BigFight
    }, {
        path: '/Training',
        name: 'Training',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Training
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router