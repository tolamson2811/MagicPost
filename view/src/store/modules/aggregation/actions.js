export default {
    async createNewAggregationEmployee(context, payload) {
        const response = await fetch(
            context.rootGetters.getApiUrl + "aggregation/leader/account/create",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + context.rootGetters.getToken,
                },
                body: JSON.stringify(payload),
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể tạo tài khoản, kiểm tra dữ liệu của bạn!",
            );
            throw error;
        }
    },

    async getAllAggregationEmployees(context, payload) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `aggregation/leader/account/list?location_id=${payload.location_id}&page=${payload.page}`,
            {
                method: "GET",
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || "Không thể lấy danh sách tài khoản!",
            );
            throw error;
        }

        context.commit(
            "setAggregationEmployees",
            responseData.aggregation_employees,
        );

        return responseData;
    },

    async deleteAggregationEmployee(context, account_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                "aggregation/leader/account/delete/" +
                account_id,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + context.rootGetters.getToken,
                },
            },
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || "Không thể xóa tài khoản!",
            );
            throw error;
        }
    },

    async getLocationIdByName(context, name) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `aggregation/location/id?name=${name}`,
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
                responseData.message || "Không thể lấy id địa điểm!",
            );
            throw error;
        }

        return responseData;
    },
};
