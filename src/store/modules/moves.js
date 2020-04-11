import api from '../api'

const state = {
    all: []
}

const getters = {}

const actions = {
    async getAllMoves({ commit }) {
        const moves = await api.getMoves();
        if (moves.length > 0) {
            commit('setMoves', moves);
        }
    }
}

const mutations = {
    setMoves(state, moves) {
        state.all = moves
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}