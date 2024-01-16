import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue'
import RegistrationPage from '@/components/RegistrationPage.vue';
import AdminPage from "@/components/AdminPage.vue";
import EditorPage from "@/components/EditorPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import RespondentPage from "@/components/RespondentPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            component: LandingPage,
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: RegistrationPage,
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage,
        },
        {
            path: '/editor',
            name: 'EditorPage',
            component: EditorPage,
        },
        {
            path: '/respondent',
            name: 'RespondentPage',
            component: RespondentPage,
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
        },
    ]
})


export default router
