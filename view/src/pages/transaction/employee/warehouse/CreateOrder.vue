<template>
    <div
        class="basis-3/4 w-full mt-16 lg:mt-20 flex flex-col justify-center items-center bg-indigo-400"
    >
        <div class="grid grid-cols-2 gap-2">
            <!-- Họ tên người gửi  -->
            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Họ tên người gửi</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentProvince.errorMessage"
                        >{{ sentProvince.errorMessage }}</span
                    >
                </span>
                <input type="text" placeholder="Họ và tên" class="p-2" />
            </span>

            <!-- Họ tên người nhận  -->
            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Họ tên người nhận</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentProvince.errorMessage"
                        >{{ sentProvince.errorMessage }}</span
                    >
                </span>
                <input type="text" placeholder="Họ và tên" class="p-2" />
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Tỉnh/Thành phố gửi</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentProvince.errorMessage"
                        >{{ sentProvince.errorMessage }}</span
                    >
                </span>
                <select
                    class="p-2 hover:cursor-pointer"
                    id="sent-province"
                    v-model="sentProvince.value"
                    @change="handleSentProvinceChange"
                >
                    <option value="Tỉnh/Thành phố gửi">
                        Tỉnh/Thành phố gửi
                    </option>
                    <option
                        v-for="province in sentProvinces"
                        :value="province.name"
                    >
                        {{ province.name }}
                    </option>
                </select>
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label
                        for="receive-province"
                        class="font-bold text-yellow-200"
                        >Tỉnh/Thành phố nhận</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="receiveProvince.errorMessage"
                        >{{ receiveProvince.errorMessage }}</span
                    >
                </span>
                <select
                    class="p-2 hover:cursor-pointer"
                    id="receive-province"
                    v-model="receiveProvince.value"
                    @change="handleReceiveProvinceChange"
                >
                    <option value="Tỉnh/Thành phố nhận">
                        Tỉnh/Thành phố nhận
                    </option>
                    <option
                        v-for="province in receiveProvinces"
                        :value="province.name"
                    >
                        {{ province.name }}
                    </option>
                </select>
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-district" class="font-bold text-yellow-200"
                        >Quận/Huyện gửi</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentDistrict.errorMessage"
                        >{{ sentDistrict.errorMessage }}</span
                    >
                </span>
                <select
                    class="p-2 hover:cursor-pointer"
                    id="sent-district"
                    v-model="sentDistrict.value"
                    @change="handleSentDistrictChange"
                >
                    <option value="Quận/Huyện gửi">Quận/Huyện gửi</option>
                    <option
                        v-for="district in sentDistricts"
                        :value="district.name"
                    >
                        {{ district.name }}
                    </option>
                </select>
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label
                        for="receive-district"
                        class="font-bold text-yellow-200"
                        >Quận/Huyện nhận</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="receiveDistrict.errorMessage"
                        >{{ receiveDistrict.errorMessage }}</span
                    >
                </span>
                <select
                    class="p-2 hover:cursor-pointer"
                    id="receive-district"
                    v-model="receiveDistrict.value"
                    @change="handleReceiveDistrictChange"
                >
                    <option value="Quận/Huyện nhận">Quận/Huyện nhận</option>
                    <option
                        v-for="district in receiveDistricts"
                        :value="district.name"
                    >
                        {{ district.name }}
                    </option>
                </select>
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label for="sent-ward" class="font-bold text-yellow-200"
                        >Phường/Xã gửi</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentWard.errorMessage"
                        >{{ sentWard.errorMessage }}</span
                    >
                </span>
                <select
                    class="p-2 hover:cursor-pointer"
                    id="sent-ward"
                    v-model="sentWard.value"
                    @change="sentWard.errorMessage = ''"
                >
                    <option value="Phường/Xã gửi">Phường/Xã gửi</option>
                    <option v-for="ward in sentWards" :value="ward.name">
                        {{ ward.name }}
                    </option>
                </select>
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label for="receive-ward" class="font-bold text-yellow-200"
                        >Phường/Xã nhận</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="receiveWard.errorMessage"
                        >{{ receiveWard.errorMessage }}</span
                    >
                </span>
                <select
                    class="p-2 hover:cursor-pointer"
                    id="receive-ward"
                    v-model="receiveWard.value"
                    @change="receiveWard.errorMessage = ''"
                >
                    <option value="Phường/Xã nhận">Phường/Xã nhận</option>
                    <option v-for="ward in receiveWards" :value="ward.name">
                        {{ ward.name }}
                    </option>
                </select>
            </span>

            <!-- Địa chỉ chi tiết người gửi  -->
            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Địa chỉ chi tiết người gửi</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentProvince.errorMessage"
                        >{{ sentProvince.errorMessage }}</span
                    >
                </span>
                <input type="text" placeholder="Địa chỉ chi tiết" class="p-2" />
            </span>

            <!-- Địa chỉ chi tiết người nhận  -->
            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Địa chỉ chi tiết người nhận</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentProvince.errorMessage"
                        >{{ sentProvince.errorMessage }}</span
                    >
                </span>
                <input type="text" placeholder="Địa chỉ chi tiết" class="p-2" />
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label
                        for="package-category"
                        class="text-yellow-200 font-bold"
                        >Loại hàng</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="packageCategory.errorMessage"
                        >{{ packageCategory.errorMessage }}</span
                    >
                </span>
                <select
                    class="p-2 hover:cursor-pointer"
                    id="package-category"
                    v-model="packageCategory.value"
                    @change="packageCategory.errorMessage = ''"
                >
                    <option value="Loại hàng">Loại hàng</option>
                    <option value="Tài liệu">Tài liệu</option>
                    <option value="Hàng hóa">Hàng hóa</option>
                </select>
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label
                        for="package-weight"
                        class="text-yellow-200 font-bold"
                        >Khối lượng (kg)</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="packageWeight.errorMessage"
                        >{{ packageWeight.errorMessage }}</span
                    >
                </span>
                <input
                    type="number"
                    v-model="packageWeight.value"
                    placeholder="Khối lượng"
                    class="p-2 hover:cursor-pointer"
                    id="package-weight"
                    @input="packageWeight.errorMessage = ''"
                />
            </span>

            <!-- Cước phí  -->
            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Cước phí</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentProvince.errorMessage"
                        >{{ sentProvince.errorMessage }}</span
                    >
                </span>
                <input type="text" placeholder="Cước phí" class="p-2" />
            </span>

            <!-- Thu hộ người nhận  -->
            <span class="flex flex-col gap-1">
                <span class="flex gap-4 items-center">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Thu hộ</label
                    >
                    <span
                        class="text-red-700 italic text-sm"
                        v-if="sentProvince.errorMessage"
                        >{{ sentProvince.errorMessage }}</span
                    >
                </span>
                <input type="text" placeholder="Số tiền thu hộ" class="p-2" />
            </span>

            <!-- Địa chỉ chi tiết người gửi  -->
            <button class=" col-span-2 px-4 py-2 bg-black text-white font-bold rounded-lg hover:opacity-90">Tạo đơn</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sentProvinces: [],
            receiveProvinces: [],
            sentDistricts: [],
            receiveDistricts: [],
            sentWards: [],
            receiveWards: [],
            sentProvince: {
                value: "Tỉnh/Thành phố gửi",
                isValid: true,
                errorMessage: "",
            },
            receiveProvince: {
                value: "Tỉnh/Thành phố nhận",
                isValid: true,
                errorMessage: "",
            },
            sentDistrict: {
                value: "Quận/Huyện gửi",
                isValid: true,
                errorMessage: "",
            },
            receiveDistrict: {
                value: "Quận/Huyện nhận",
                isValid: true,
                errorMessage: "",
            },
            sentWard: {
                value: "Phường/Xã gửi",
                isValid: true,
                errorMessage: "",
            },
            receiveWard: {
                value: "Phường/Xã nhận",
                isValid: true,
                errorMessage: "",
            },
            packageCategory: {
                value: "Loại hàng",
                isValid: true,
                errorMessage: "",
            },
            packageWeight: { value: null, isValid: true, errorMessage: "" },
        };
    },
    methods: {
        async setEstimateProvinces() {
            await this.$store.dispatch("address/getProvinces");
            this.sentProvinces = this.$store.getters["address/getProvinces"];
            this.receiveProvinces = this.$store.getters["address/getProvinces"];
        },
        async handleSentProvinceChange() {
            this.sentProvince.errorMessage = "";

            this.sentDistricts = [];
            this.sentDistrict.value = "Quận/Huyện gửi";
            this.sentWards = [];
            this.sentWard.value = "Phường/Xã gửi";
            let provinceCode = "";
            for (let province of this.sentProvinces) {
                if (province.name === this.sentProvince.value) {
                    provinceCode = province.code;
                    break;
                }
            }

            const districts = this.$store.getters["address/getDistricts"];

            for (const district in districts) {
                if (districts[district].province_code === provinceCode) {
                    this.sentDistricts.push(districts[district]);
                }
            }
        },
        async handleReceiveProvinceChange() {
            this.receiveProvince.errorMessage = "";

            this.receiveDistricts = [];
            this.receiveDistrict.value = "Quận/Huyện nhận";
            this.receiveWards = [];
            this.receiveWard.value = "Phường/Xã nhận";
            let provinceCode = "";
            for (let province of this.receiveProvinces) {
                if (province.name === this.receiveProvince.value) {
                    provinceCode = province.code;
                    break;
                }
            }

            const districts = this.$store.getters["address/getDistricts"];

            for (const district in districts) {
                if (districts[district].province_code === provinceCode) {
                    this.receiveDistricts.push(districts[district]);
                }
            }
        },
        async handleSentDistrictChange() {
            this.sentDistrict.errorMessage = "";

            this.sentWards = [];
            this.sentWard.value = "Phường/Xã gửi";

            let districtCode = "";
            for (let district of this.sentDistricts) {
                if (district.name === this.sentDistrict.value) {
                    districtCode = district.code;
                    break;
                }
            }

            const wards = this.$store.getters["address/getWards"];

            for (const ward in wards) {
                if (wards[ward].district_code === districtCode) {
                    this.sentWards.push(wards[ward]);
                }
            }
        },
        async handleReceiveDistrictChange() {
            this.receiveDistrict.errorMessage = "";

            this.receiveWards = [];
            this.receiveWard.value = "Phường/Xã nhận";

            let districtCode = "";
            for (let district of this.receiveDistricts) {
                if (district.name === this.receiveDistrict.value) {
                    districtCode = district.code;
                    break;
                }
            }

            const wards = this.$store.getters["address/getWards"];

            for (const ward in wards) {
                if (wards[ward].district_code === districtCode) {
                    this.receiveWards.push(wards[ward]);
                }
            }
        },
        handleEstimateFee() {
            if (this.validateEstimateForm) {
                const formData = {
                    sentProvince: this.sentProvince.value,
                    receiveProvince: this.receiveProvince.value,
                    sentDistrict: this.sentDistrict.value,
                    receiveDistrict: this.receiveDistrict.value,
                    sentWard: this.sentWard.value,
                    receiveWard: this.receiveWard.value,
                    packageCategory: this.packageCategory.value,
                    packageWeight: this.packageWeight.value,
                };

                console.log(formData);
                this.resetEstimateFeeForm();
            } else {
                console.log("invalid form");
                return;
            }
        },
        resetEstimateFeeForm() {
            this.sentProvince.value = "Tỉnh/Thành phố gửi";
            this.receiveProvince.value = "Tỉnh/Thành phố nhận";
            this.sentDistrict.value = "Quận/Huyện gửi";
            this.receiveDistrict.value = "Quận/Huyện nhận";
            this.sentWard.value = "Phường/Xã gửi";
            this.receiveWard.value = "Phường/Xã nhận";
            this.packageCategory.value = "Loại hàng";
            this.packageWeight.value = null;
            this.sentProvince.isValid = true;
            this.receiveProvince.isValid = true;
            this.sentDistrict.isValid = true;
            this.receiveDistrict.isValid = true;
            this.sentWard.isValid = true;
            this.receiveWard.isValid = true;
            this.packageCategory.isValid = true;
            this.packageWeight.isValid = true;
            this.sentProvince.errorMessage = "";
            this.receiveProvince.errorMessage = "";
            this.sentDistrict.errorMessage = "";
            this.receiveDistrict.errorMessage = "";
            this.sentWard.errorMessage = "";
            this.receiveWard.errorMessage = "";
            this.packageCategory.errorMessage = "";
            this.packageWeight.errorMessage = "";
        },
    },
    computed: {
        validateEstimateForm() {
            let isValid = true;
            if (this.sentProvince.value === "Tỉnh/Thành phố gửi") {
                this.sentProvince.isValid = false;
                this.sentProvince.errorMessage =
                    "Vui lòng chọn tỉnh/thành phố gửi";
                isValid = false;
            } else {
                this.sentProvince.isValid = true;
                this.sentProvince.errorMessage = "";
            }

            if (this.receiveProvince.value === "Tỉnh/Thành phố nhận") {
                this.receiveProvince.isValid = false;
                this.receiveProvince.errorMessage =
                    "Vui lòng chọn tỉnh/thành phố nhận";
                isValid = false;
            } else {
                this.receiveProvince.isValid = true;
                this.receiveProvince.errorMessage = "";
            }

            if (this.sentDistrict.value === "Quận/Huyện gửi") {
                this.sentDistrict.isValid = false;
                this.sentDistrict.errorMessage = "Vui lòng chọn quận/huyện gửi";
                isValid = false;
            } else {
                this.sentDistrict.isValid = true;
                this.sentDistrict.errorMessage = "";
            }

            if (this.receiveDistrict.value === "Quận/Huyện nhận") {
                this.receiveDistrict.isValid = false;
                this.receiveDistrict.errorMessage =
                    "Vui lòng chọn quận/huyện nhận";
                isValid = false;
            } else {
                this.receiveDistrict.isValid = true;
                this.receiveDistrict.errorMessage = "";
            }

            if (this.sentWard.value === "Phường/Xã gửi") {
                this.sentWard.isValid = false;
                this.sentWard.errorMessage = "Vui lòng chọn phường/xã gửi";
                isValid = false;
            } else {
                this.sentWard.isValid = true;
                this.sentWard.errorMessage = "";
            }

            if (this.receiveWard.value === "Phường/Xã nhận") {
                this.receiveWard.isValid = false;
                this.receiveWard.errorMessage = "Vui lòng chọn phường/xã nhận";
                isValid = false;
            } else {
                this.receiveWard.isValid = true;
                this.receiveWard.errorMessage = "";
            }

            if (this.packageCategory.value === "Loại hàng") {
                this.packageCategory.isValid = false;
                this.packageCategory.errorMessage =
                    "Vui lòng chọn loại hàng hóa";
                isValid = false;
            } else {
                this.packageCategory.isValid = true;
                this.packageCategory.errorMessage = "";
            }

            if (this.packageWeight.value === null) {
                this.packageWeight.isValid = false;
                this.packageWeight.errorMessage =
                    "Vui lòng nhập khối lượng hàng hóa";
                isValid = false;
            } else {
                this.packageWeight.isValid = true;
                this.packageWeight.errorMessage = "";
            }

            return isValid;
        },
    },
    mounted() {
        //call api lấy dữ liệu các tỉnh/huyện/xã
        this.setEstimateProvinces();
        this.$store.dispatch("address/getDistricts");
        this.$store.dispatch("address/getWards");
    },
};
</script>
