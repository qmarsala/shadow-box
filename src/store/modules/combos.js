import api from '../api'

const state = {
    all: []
}

const getters = {}

const actions = {
    async getAllCombos({ commit }) {
        const combos = await api.getCombos();
        if (combos.length > 0) {
            commit('setCombos', combos);
        }
    },
    async createCombo({ dispatch }, combo) {
       await api.createCombo(combo);
       dispatch('getAllCombos');
    }
}

const mutations = {
    setCombos(state, combos) {
        state.all = combos
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}