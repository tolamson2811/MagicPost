export default {
    isAuthenticated(state) {
        return !!state.token;
    },
    getUserEmail(state) {
        return state.userEmail;
    },
    isManager(state) {
        return state.role === "Manager";
    }
}