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
            meta: { showGoBack: true },
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage,
            meta: { showLogout: true},
        },
        {
            path: '/editor',
            name: 'EditorPage',
            component: EditorPage,
            meta: { showLogout: true, showGoBack: true },
        },
        {
            path: '/login',
            name: 'LoginPage',
            component: LoginPage,
            meta: { showGoBack: true },
        },
        {
            path: '/createSurvey',
            name: 'CreateSurveyPage',
            component: CreateSurveyPage,
            meta: { showLogout: true, showGoBack: true },
        },
        {
            path: '/analyseSurvey',
            name: 'AnalyseSurveyPage',
            component: AnalyseSurveyPage,
            meta: { showLogout: true, showGoBack: true },
        },
        {
            path: '/respondent/',
            name: 'RespondentPage',
            component: RespondentPage,
            meta: { showLogout: true},
        },
        {
            path: '/response/',
            name: 'ResponsePage',
            component: ResponsePage,
            meta: { showLogout: true, showGoBack: true},
        },
    ]
})

export default router
