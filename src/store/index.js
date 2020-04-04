import Vue from 'vue'
import Vuex from 'vuex'

import combos from './modules/combos';
import flow from './modules/flow';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        combos,
        flow
    },
    strict: debug
})