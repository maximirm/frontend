import {createStore} from 'vuex';

const store = createStore({
    state: {
        selectedSurvey: null,
        userToken: null,
        userId: null
    },
    mutations: {
        setSelectedSurvey(state, survey) {
            state.selectedSurvey = survey;
        },
        setUserToken(state, token) {
            state.userToken = token
        },
        setUserId(state, userId) {
            state.userId = userId
        },
    },
    actions: {
        resetStore({ commit }) {
            commit('setSelectedSurvey', null);
            commit('setUserToken', null);
            commit('setUserId', null);
        },
    }

})

export default store
