import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

export default {
    state() {
        return {
            token: null,
            userId: null,
            tokenExpiration: null,
            didAutoLogout: false,
            userEmail: null,
            role: null
        }
    },
    actions,
    mutations,
    getters
}