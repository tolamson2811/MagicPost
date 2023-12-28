import {createStore} from 'vuex'

import authModule from './modules/auth/index.js'
import addressModule from './modules/address/index.js'
import managerModule from './modules/manager/index.js'
import transactionModule from './modules/transaction/index.js'
import aggregationModule from './modules/aggregation/index.js'
import packageModule from './modules/package/index.js'

const baseUrl = import.meta.env.VITE_BASE_URL

const store = createStore({
    modules: {
        auth: authModule,
        address: addressModule,
        manager: managerModule,
        transaction: transactionModule,
        aggregation: aggregationModule,
        package: packageModule
    },
    state() {
        return {
            // apiUrl: 'http://localhost:8080/'
            // apiUrl: 'https://magic-post-api.vercel.app/'
            apiUrl: baseUrl
        }
    },
    getters: {
        getApiUrl(state) {
            return state.apiUrl
        }
    }
})

export default store