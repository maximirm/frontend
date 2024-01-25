import {createRouter, createWebHistory} from 'vue-router';
import LandingPage from '@/pages/LandingPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue';
import AdminPage from "@/pages/admin/AdminPage.vue";
import EditorPage from "@/pages/editor/EditorPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RespondentPage from "@/pages/respondent/RespondentPage.vue";
import CreateSurveyPage from "@/pages/editor/CreateSurveyPage.vue";
import AnalyseSurveyPage from "@/pages/editor/AnalyseSurveyPage.vue";
import ResponsePage from "@/pages/respondent/ResponsePage.vue";

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
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
        },
        {
            path: '/createSurvey',
            name: 'CreateSurveyPage',
            component: CreateSurveyPage,
        },
        {
            path: '/analyseSurvey',
            name: 'AnalyseSurveyPage',
            component: AnalyseSurveyPage,
        },
        {
            path: '/respondent/',
            name: 'RespondentPage',
            component: RespondentPage,
        },
        {
            path: '/response/',
            name: 'ResponsePage',
            component: ResponsePage,
        },
    ]
})

export default router
