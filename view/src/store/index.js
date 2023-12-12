import {createStore} from 'vuex'

import authModule from './modules/auth/index.js'
import addressModule from './modules/address/index.js'

const store = createStore({
    modules: {
        auth: authModule,
        address: addressModule
    },
    state() {
        return {
            apiUrl: 'https://magic-post-api.vercel.app/'
        }
    },
    getters: {
        getApiUrl(state) {
            return state.apiUrl
        }
    }
})

export default store