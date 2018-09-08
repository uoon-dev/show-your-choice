import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    question: ''
  },
  mutations: {
    'SET_QUESTIONS' (state, question) {
      debugger;
      state.title = question;
    },
  },
  actions: {
    setQuestion: ({ commit }, question) => {
      commit('SET_QUESTIONS', question);
    },
  },
});
