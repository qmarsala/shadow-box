const state = {
    running: false
}

const getters = {}

const actions = {
    async start({ commit }) {
        commit("changeRunning", true)
    },
    async stop({ commit }) {
        commit("changeRunning", false)
    }
}

const mutations = {
    changeRunning(state, running) {
        state.running = running
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}