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
    isTransactionEmployee(state) {
        return state.role === "Transaction Employee";
    },
    isAggregationLead(state) {
        return state.role === "Aggregation Lead";
    },
    isAggregationEmployee(state) {
        return state.role === "Aggregation Employee";
    },
    isCustomer(state) {
        return state.role === "Customer";
    },
    getUserId(state) {
        return state.userId;
    },
    getToken(state) {
        return state.token;
    },
};
