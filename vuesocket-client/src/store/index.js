import Vue from "vue";
import Vuex from "vuex";
import io from "socket.io-client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: io("http://localhost:4000"),
    me: {
      username: ""
    },
    message: [],
    users: []
  },
  getters: {
    getSocket(state) {
      return state.socket;
    },
    getMessage(state) {
      return state.message;
    },
    getUsername(state) {
      return state.me.username;
    }
  },
  mutations: {
    SET_MESSAGE(state, payload) {
      state.message = [...state.message, ...payload];
    },
    SET_USERS(state, payload) {
      state.users = [...state.users, ...payload];
    },
    SET_USERNAME(state, payload) {
      state.me = {
        ...state.me,
        username: payload
      };
    }
  },
  actions: {
    setMessage({ commit }, data) {
      commit("SET_MESSAGE", data);
    },
    setUser({ commit }, data) {
      commit("SET_USER", data);
    },
    setUsername({ commit }, data) {
      commit("SET_USERNAME", data);
    }
  },
  modules: {}
});
