export default {
    async signup(context, payload) {
        let apiUrl = (await context.rootGetters.getApiUrl) + "auth" + "/signup";

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

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

    async login(context, payload) {
        let apiUrl = (await context.rootGetters.getApiUrl) + "auth" + "/login";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        console.log(responseData);

        if (!response.ok) {
            let errorMessage = "Không thể đăng nhập, kiểm tra dữ liệu của bạn";
            if (responseData.errors && responseData.errors.length > 0) {
                errorMessage = responseData.errors[0].msg;
            } else if (responseData.message) {
                errorMessage = responseData.message;
            }
            const error = new Error(errorMessage);
            throw error;
        }

        context.commit("setUser", {
            token: responseData.token,
            userId: responseData.id,
            expiresIn: responseData.expiresIn,
            userEmail: responseData.email,
            role: responseData.role,
        });

        const expiresIn = new Date().getTime() + responseData.expiresIn * 1000;

        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.id);
        localStorage.setItem("tokenExpiration", expiresIn);
        localStorage.setItem("userEmail", responseData.email);
        localStorage.setItem("role", responseData.role);
    },

    async autoLogin(context) {
        console.log("auto login");

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const tokenExpiration = localStorage.getItem("tokenExpiration");
        const userEmail = localStorage.getItem("userEmail");
        const role = localStorage.getItem("role");

        const expiresIn = +tokenExpiration - new Date().getTime();

        console.log(expiresIn);

        if (expiresIn < 0) {
            context.dispatch("logout");
            return;
        }

        context.commit("setUser", {
            token: token,
            userId: userId,
            tokenExpiration: tokenExpiration,
            userEmail: userEmail,
            role: role,
        });
    },

    async logout(context) {
        context.commit("setUser", {
            token: null,
            userId: null,
            tokenExpiration: null,
            userEmail: null,
            role: null,
        });

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("role");
    },
};
