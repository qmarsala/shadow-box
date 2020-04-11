import Vue from 'vue'
import Vuex from 'vuex'

import combos from './modules/combos';
import moves from './modules/moves';
import flow from './modules/flow';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        isSouthpawStanceEnabled: false
    },
    actions: {
        toggleStance({ commit }) {
            commit("toggleStance")
        }
    },
    mutations: {
        toggleStance(state) {
            state.isSouthpawStanceEnabled = !state.isSouthpawStanceEnabled
        }
    },
    modules: {
        combos,
        moves,
        flow
    },
    strict: debug
})