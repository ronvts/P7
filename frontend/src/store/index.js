import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState()],
	state: {
		token: null,
		userId: null,
		isAdmin: false,
		isLogged: false,
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
			state.isLogged = !!token;
		},
		setAdmin(state, admin) {
			state.isAdmin = admin;
		},
		setUser(state, user) {
			state.userId = user;
		},
	},
	actions: {
		setToken({ commit }, token) {
			commit("setToken", token);
		},
		setAdmin({ commit }, admin) {
			commit("setAdmin", admin);
		},
		setUser({ commit }, user) {
			commit("setUser", user);
		},
	},
});
