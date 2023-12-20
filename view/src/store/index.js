import {createStore} from 'vuex'

import authModule from './modules/auth/index.js'
import addressModule from './modules/address/index.js'
import managerModule from './modules/manager/index.js'

const store = createStore({
    modules: {
        auth: authModule,
        address: addressModule,
        manager: managerModule
    },
    state() {
        return {
            apiUrl: 'http://localhost:8080/'
        }
    },
    getters: {
        getApiUrl(state) {
            return state.apiUrl
        }
    }
})

export default store