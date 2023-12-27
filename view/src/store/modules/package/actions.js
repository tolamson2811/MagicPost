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
            context.rootGetters.getApiUrl +
                `package/list?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
                    "Content-Type": "application/json",
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
    },

    async addPackageStatus(context, payload) {
        const response = await fetch(
            context.rootGetters.getApiUrl + "package/status/add",
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
                responseData.message || "Không thể thêm trạng thái đơn hàng!",
            );
            throw error;
        }
        return responseData;
    },

    async getDeliveringPackage(context, location_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `package/list/transport?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể lấy danh sách đơn hàng đang vận chuyển!",
            );
            throw error;
        }
        return responseData;
    },

    async getDeliveredPackage(context, location_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `package/list/delivered?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể lấy danh sách đơn hàng đã giao!",
            );
            throw error;
        }
        return responseData;
    },

    async getFailedDeliveryPackage(context, location_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `package/list/failed?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể lấy danh sách đơn hàng giao thất bại!",
            );
            throw error;
        }
        return responseData;
    },

    async getDeliveryStatus(context, package_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `package/detail/delivery/${package_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

    async getAggregationWaitingPackage(context, location_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `package/aggregation/warehouse/received?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể lấy danh sách đơn hàng đang chờ lấy!",
            );
            throw error;
        }
        return responseData;
    },

    async getAggregationPackageInWarehouse(context, location_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `package/aggregation/warehouse/list?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể lấy danh sách đơn hàng đang trong kho!",
            );
            throw error;
        }
        return responseData;
    },

    async getTransactionWaitingPackage(context, location_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `package/transaction/warehouse/received?location_id=${location_id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể lấy danh sách đơn hàng đang chờ xác nhận!",
            );
            throw error;
        }
        return responseData;
    },
};
