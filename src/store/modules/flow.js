import api from "../api";

const state = {
    running: false,
    all: []
}

const getters = {}

const actions = {
    async saveFlow({ commit }, flow) {
        await api.saveFlow(flow);
        commit("addFlow", flow);
    },
    async getAllFlows({ commit }) {
        const flows = await api.getFlows();
        if (flows.length > 0) {
            commit('setFlows', flows);
        }
    },
    async start({ commit }) {
        commit("setRunning", true);
    },
    async stop({ commit }) {
        commit("setRunning", false);
    }
}

const mutations = {
    setFlows(state, flows) {
        state.all = flows;
    },
    addFlow(state, flow) {
        state.all.push(flow);
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