export default {
    isAuthenticated(state) {
        return !!state.token;
    },
    getUserEmail(state) {
        return state.userEmail;
    },
    isManager(state) {
        return state.role === "Manager";
    },
    isTransactionLead(state) {
        return state.role === "Transaction Lead";
    },
    getUserId(state) {
        return state.userId;
    }
}