const state = {
    running: false,
    flowMoves: []
}

const getters = {}

const actions = {
    async createFlow({ commit }, combos) {
        let flowMoves = [];
        for (const combo of combos) {
            for (const move of combo.moves) {
                flowMoves.push({
                    ...move,
                    comboName: combo.name
                });
            }
        }
        commit("setFlowMoves", flowMoves);
    },
    async start({ commit }) {
        commit("setRunning", true);
    },
    async stop({ commit }) {
        commit("setRunning", false);
    }
}

const mutations = {
    setFlowMoves(state, flowMoves) {
        state.flowMoves = flowMoves;
    },
    setRunning(state, running) {
        state.running = running;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}