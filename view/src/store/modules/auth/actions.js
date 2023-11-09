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
            const error = new Error(
                responseData.errors[0].msg || responseData.message || "Failed to authenticate. Check your data."
            );
            console.log(error);
            throw error;
        }
    },
};
