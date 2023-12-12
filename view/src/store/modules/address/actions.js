export default {
    async getProvinces(context) {
        const response = await fetch("https://provinces.open-api.vn/api/p");

        const responseData = await response.json();

        context.commit("setProvinces", responseData);

        return responseData;
    },

    async getDistricts(context) {
        const response = await fetch(`https://provinces.open-api.vn/api/d`);

        const responseData = await response.json();

        context.commit("setDistricts", responseData);

        return responseData;
    },

    async getWards(context) {
        const response = await fetch("https://provinces.open-api.vn/api/w");

        const responseData = await response.json();

        context.commit("setWards", responseData);

        return responseData;
    },
};
