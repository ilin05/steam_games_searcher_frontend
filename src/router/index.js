import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from "@/components/Login.vue";
import RegisterVue from "@/components/Register.vue";
import UserVue from "@/components/User.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            redirect: '/login'
        },
        {
            path:'/login',
            component: LoginVue
        },
        {
            path:'/register',
            component: RegisterVue
        },
        {
            path:'/user',
            component: UserVue
        }
    ]
})

export default router