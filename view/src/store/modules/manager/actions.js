export default {
    //Tạo tài khoản trưởng điểm tập kết
    async createAggregationLeader(context, payload) {
        let apiUrl =
            (await context.rootGetters.getApiUrl) +
            "manager/account/aggregation/create";
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + context.rootGetters.getToken,
            },
            body: JSON.stringify(payload),
        });

        console.log(response);

        const responseData = await response.json();

        if (!response.ok) {
            let errorMessage = "Không thể đăng ký, kiểm tra dữ liệu của bạn";
            if (responseData.errors && responseData.errors.length > 0) {
                errorMessage = responseData.errors[0].msg;
            } else if (responseData.message) {
                errorMessage = responseData.message;
            }
            const error = new Error(errorMessage);
            throw error;
        }
    },
    //Tạo tài khoản trưởng điểm giao dịch
    async createTransactionLeader(context, payload) {
        let apiUrl =
            (await context.rootGetters.getApiUrl) +
            "manager/account/transaction/create";
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + context.rootGetters.getToken,
            },
            body: JSON.stringify(payload),
        });

        console.log(response);

        const responseData = await response.json();

        if (!response.ok) {
            let errorMessage = "Không thể đăng ký, kiểm tra dữ liệu của bạn";
            if (responseData.errors && responseData.errors.length > 0) {
                errorMessage = responseData.errors[0].msg;
            } else if (responseData.message) {
                errorMessage = responseData.message;
            }
            const error = new Error(errorMessage);
            throw error;
        }
    },

    //Lấy tất cả thông tin tài khoản trưởng điểm
    async getAllLeader(context, page) {
        let apiUrl =
            (await context.rootGetters.getApiUrl) +
            `manager/account?page=${page}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + context.rootGetters.getToken,
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            let errorMessage = "Không thể lấy dữ liệu, vui lòng thử lại sau";
            if (responseData.errors && responseData.errors.length > 0) {
                errorMessage = responseData.errors[0].msg;
            } else if (responseData.message) {
                errorMessage = responseData.message;
            }
            const error = new Error(errorMessage);
            throw error;
        }

        context.commit("setEmployees", responseData.employees);

        return responseData;
    },

    // Xóa tài khoản trưởng điểm
    async deleteLeader(context, account_id) {
        let apiUrl =
            (await context.rootGetters.getApiUrl) +
            `manager/account/${account_id}`;
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + context.rootGetters.getToken,
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            let errorMessage = "Không thể xóa tài khoản, vui lòng thử lại sau";
            if (responseData.errors && responseData.errors.length > 0) {
                errorMessage = responseData.errors[0].msg;
            } else if (responseData.message) {
                errorMessage = responseData.message;
            }
            const error = new Error(errorMessage);
            throw error;
        }
    }
};
