export default {
    async createNewTransactionEmployee(context, payload) {
        const response = await fetch(
            context.rootGetters.getApiUrl + "transaction/leader/account/create",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + context.rootGetters.getToken,
                },
                body: JSON.stringify(payload),
            }
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message ||
                    "Không thể tạo tài khoản, kiểm tra dữ liệu của bạn!"
            );
            throw error;
        }
    },
    async getAllTransactionEmployees(context, payload) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                `transaction/leader/account/list?location_id=${payload.location_id}&page=${payload.page}`,
            {
                method: "GET",
            }
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || "Không thể lấy danh sách tài khoản!"
            );
            throw error;
        }

        context.commit(
            "setTransactionEmployees",
            responseData.transaction_employees
        );

        return responseData;
    },
    async deleteTransactionEmployee(context, account_id) {
        const response = await fetch(
            context.rootGetters.getApiUrl +
                "transaction/leader/account/delete/" +
                account_id,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + context.rootGetters.getToken,
                },
            }
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || "Không thể xóa tài khoản!"
            );
            throw error;
        }
    }
};
