import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/pages/LandingPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue';
import AdminPage from "@/pages/AdminPage.vue";
import EditorPage from "@/pages/EditorPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RespondentPage from "@/pages/RespondentPage.vue";
import CreateSurveyPage from "@/pages/CreateSurveyPage.vue";
import AnalyseSurveyPage from "@/pages/AnalyseSurveyPage.vue";
import CreateQuestionPage from "@/pages/CreateQuestionPage.vue";

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
            path: '/createQuestion',
            name: 'CreateQuestionPage',
            component: CreateQuestionPage,
        },
    ]
})


export default router
