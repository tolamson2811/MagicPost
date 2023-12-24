export default {
    async createNewOrder(context, payload) {
        const response = await fetch(
            context.rootGetters.getApiUrl + "package/create",
            {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + context.rootGetters.getToken,
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || "Không thể tạo đơn hàng!",
            );
            throw error;
        }
        return responseData;
    },
};
