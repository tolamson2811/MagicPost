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

    async getPackageStatusByLocationId(context, location_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl + `package/list?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || "Không thể lấy trạng thái đơn hàng!",
            );
            throw error;
        }
        return responseData;
    },

    async getPackageDetail(context, package_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl + `package/detail/${package_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || "Không thể lấy chi tiết đơn hàng!",
            );
            throw error;
        }
        return responseData;
    }
};
