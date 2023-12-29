<template>
    <div
        class="mt-0 flex w-full basis-3/4 flex-col items-center justify-center bg-indigo-300 py-2 xl:mt-20 xl:py-0"
    >
        <form
            @submit.prevent="handleSubmit"
            class="grid w-full grid-cols-2 gap-2 gap-x-8 px-12 text-sm"
        >
            <!-- Họ tên người gửi  -->
            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label
                        for="sender-fullname"
                        class="font-bold text-yellow-200"
                        >Họ tên người gửi</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="senderFullname.errorMessage"
                        >{{ senderFullname.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    id="sender-fullname"
                    placeholder="Họ và tên"
                    class="p-2"
                    v-model="senderFullname.value"
                    @input="senderFullname.errorMessage = ''"
                />
            </span>

            <!-- Họ tên người nhận  -->
            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label
                        for="receiver-fullname"
                        class="font-bold text-yellow-200"
                        >Họ tên người nhận</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="receiverFullname.errorMessage"
                        >{{ receiverFullname.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    id="receiver-fullname"
                    placeholder="Họ và tên"
                    class="p-2"
                    v-model="receiverFullname.value"
                    @input="receiverFullname.errorMessage = ''"
                />
            </span>

            <!-- Sđt người gửi  -->
            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label for="sender-phone" class="font-bold text-yellow-200"
                        >Số điện thoại người gửi</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="senderPhone.errorMessage"
                        >{{ senderPhone.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    id="sender-phone"
                    placeholder="Số điện thoại"
                    class="p-2"
                    v-model="senderPhone.value"
                    @input="senderPhone.errorMessage = ''"
                />
            </span>

            <!-- Sđt người nhận  -->
            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label
                        for="receiver-phone"
                        class="font-bold text-yellow-200"
                        >Số điện thoại người nhận</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="receiverPhone.errorMessage"
                        >{{ receiverPhone.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    id="receiver-phone"
                    placeholder="Số điện thoại"
                    class="p-2"
                    v-model="receiverPhone.value"
                    @input="receiverPhone.errorMessage = ''"
                />
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label for="sent-province" class="font-bold text-yellow-200"
                        >Tỉnh/Thành phố gửi</label
                    >
                    <span
                        class="text-sm italic text-red-700"
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
                <span class="flex items-center gap-4">
                    <label
                        for="receive-province"
                        class="font-bold text-yellow-200"
                        >Tỉnh/Thành phố nhận</label
                    >
                    <span
                        class="text-sm italic text-red-700"
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
                <span class="flex items-center gap-4">
                    <label for="sent-district" class="font-bold text-yellow-200"
                        >Quận/Huyện gửi</label
                    >
                    <span
                        class="text-sm italic text-red-700"
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
                        class="text-sm italic text-red-700"
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
                        class="text-sm italic text-red-700"
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
                        class="text-sm italic text-red-700"
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
                <span class="flex items-center gap-4">
                    <label
                        for="sender-detail-address"
                        class="font-bold text-yellow-200"
                        >Địa chỉ chi tiết người gửi</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="senderDetailAddress.errorMessage"
                        >{{ senderDetailAddress.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    id="sender-detail-address"
                    placeholder="Địa chỉ chi tiết"
                    class="p-2"
                    v-model="senderDetailAddress.value"
                    @input="senderDetailAddress.errorMessage = ''"
                />
            </span>

            <!-- Địa chỉ chi tiết người nhận  -->
            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label
                        for="receiver-detail-address"
                        class="font-bold text-yellow-200"
                        >Địa chỉ chi tiết người nhận</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="receiverDetailAddress.errorMessage"
                        >{{ receiverDetailAddress.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    id="receiver-detail-address"
                    placeholder="Địa chỉ chi tiết"
                    class="p-2"
                    v-model="receiverDetailAddress.value"
                    @input="receiverDetailAddress.errorMessage = ''"
                />
            </span>

            <span class="flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label
                        for="package-category"
                        class="font-bold text-yellow-200"
                        >Loại hàng</label
                    >
                    <span
                        class="text-sm italic text-red-700"
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
                <span class="flex items-center gap-4">
                    <label
                        for="package-weight"
                        class="font-bold text-yellow-200"
                        >Khối lượng (kg)</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="packageWeight.errorMessage"
                        >{{ packageWeight.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    v-model="packageWeight.value"
                    placeholder="Khối lượng"
                    class="p-2 hover:cursor-pointer"
                    id="package-weight"
                    @input="packageWeight.errorMessage = ''"
                />
            </span>

            <!-- Cước phí  -->
            <span class="col-span-2 flex flex-col gap-1">
                <span class="flex items-center gap-4">
                    <label for="total-price" class="font-bold text-yellow-200"
                        >Cước phí</label
                    >
                    <span
                        class="text-sm italic text-red-700"
                        v-if="totalPrice.errorMessage"
                        >{{ totalPrice.errorMessage }}</span
                    >
                </span>
                <input
                    type="text"
                    id="total-price"
                    placeholder="Cước phí"
                    class="p-2"
                    v-model="totalPrice.value"
                    @input="totalPrice.errorMessage = ''"
                />
            </span>

            <!-- Thu hộ người nhận  -->
            <!-- <span class="flex flex-col gap-1">
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
            </span> -->

            <!-- Địa chỉ chi tiết người gửi  -->
            <button
                class="col-span-2 rounded-lg bg-black px-4 py-2 font-bold text-white hover:opacity-90"
            >
                Tạo đơn
            </button>
        </form>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="error = null"
            @exit="error = null"
        >
            <p>{{ error }}</p>
        </base-dialog>
    </div>
</template>

<script>
export default {
    props: ["employee_id"],
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
            senderDetailAddress: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            receiverDetailAddress: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            totalPrice: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            senderFullname: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            receiverFullname: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            senderPhone: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            receiverPhone: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            error: null,
            isLoading: false,
            location_id: null,
        };
    },
    methods: {
        async setProvinces() {
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
        async handleSubmit() {
            if (this.validateForm) {
                const formData = {
                    sender_name: this.senderFullname.value,
                    sender_province: this.sentProvince.value,
                    sender_district: this.sentDistrict.value,
                    sender_ward: this.sentWard.value,
                    sender_detail_address: this.senderDetailAddress.value,
                    sender_phone: this.senderPhone.value,
                    receiver_name: this.receiverFullname.value,
                    receiver_phone: this.receiverPhone.value,
                    receiver_province: this.receiveProvince.value,
                    receiver_district: this.receiveDistrict.value,
                    receiver_ward: this.receiveWard.value,
                    receiver_detail_address: this.receiverDetailAddress.value,
                    receiver_phone: this.receiverPhone.value,
                    type: this.packageCategory.value,
                    weight: Number(this.packageWeight.value),
                    price: this.totalPrice.value,
                    location_id: this.location_id,
                };

                try {
                    this.isLoading = true;
                    const package_id = await this.$store.dispatch(
                        "package/createNewOrder",
                        formData,
                    );
                    this.isLoading = false;
                    this.$notify({
                        title: "Tạo đơn hàng thành công",
                        type: "success",
                    });
                    this.resetForm();
                    this.$router.push(`/receipt/${package_id}`);
                } catch (error) {
                    this.isLoading = false;
                    this.error = error.message;
                }
                this.isLoading = false;
            } else {
                console.log("invalid form");
                return;
            }
        },
        resetForm() {
            //reset value
            this.sentProvince.value = "Tỉnh/Thành phố gửi";
            this.receiveProvince.value = "Tỉnh/Thành phố nhận";
            this.sentDistrict.value = "Quận/Huyện gửi";
            this.receiveDistrict.value = "Quận/Huyện nhận";
            this.sentWard.value = "Phường/Xã gửi";
            this.receiveWard.value = "Phường/Xã nhận";
            this.packageCategory.value = "Loại hàng";
            this.packageWeight.value = null;
            this.senderFullname.value = "";
            this.receiverFullname.value = "";
            this.senderPhone.value = "";
            this.receiverPhone.value = "";
            this.senderDetailAddress.value = "";
            this.receiverDetailAddress.value = "";
            this.totalPrice.value = "";

            // reset valid
            this.sentProvince.isValid = true;
            this.receiveProvince.isValid = true;
            this.sentDistrict.isValid = true;
            this.receiveDistrict.isValid = true;
            this.sentWard.isValid = true;
            this.receiveWard.isValid = true;
            this.packageCategory.isValid = true;
            this.packageWeight.isValid = true;
            this.senderFullname.isValid = true;
            this.receiverFullname.isValid = true;
            this.senderPhone.isValid = true;
            this.receiverPhone.isValid = true;
            this.senderDetailAddress.isValid = true;
            this.receiverDetailAddress.isValid = true;
            this.totalPrice.isValid = true;

            // reset error message
            this.sentProvince.errorMessage = "";
            this.receiveProvince.errorMessage = "";
            this.sentDistrict.errorMessage = "";
            this.receiveDistrict.errorMessage = "";
            this.sentWard.errorMessage = "";
            this.receiveWard.errorMessage = "";
            this.packageCategory.errorMessage = "";
            this.packageWeight.errorMessage = "";
            this.senderFullname.errorMessage = "";
            this.receiverFullname.errorMessage = "";
            this.senderPhone.errorMessage = "";
            this.receiverPhone.errorMessage = "";
            this.senderDetailAddress.errorMessage = "";
            this.receiverDetailAddress.errorMessage = "";
            this.totalPrice.errorMessage = "";
        },
        async getLocationId() {
            const res = await this.$store.dispatch(
                "manager/getEmployeeById",
                this.employee_id,
            );
            this.location_id = res.location_id;
        },
    },
    computed: {
        validateForm() {
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

            if (this.senderFullname.value === "") {
                this.senderFullname.isValid = false;
                this.senderFullname.errorMessage =
                    "Vui lòng nhập họ tên người gửi";
                isValid = false;
            } else {
                this.senderFullname.isValid = true;
                this.senderFullname.errorMessage = "";
            }

            if (this.receiverFullname.value === "") {
                this.receiverFullname.isValid = false;
                this.receiverFullname.errorMessage =
                    "Vui lòng nhập họ tên người nhận";
                isValid = false;
            } else {
                this.receiverFullname.isValid = true;
                this.receiverFullname.errorMessage = "";
            }

            if (this.senderPhone.value === "") {
                this.senderPhone.isValid = false;
                this.senderPhone.errorMessage =
                    "Vui lòng nhập số điện thoại người gửi";
                isValid = false;
            } else {
                this.senderPhone.isValid = true;
                this.senderPhone.errorMessage = "";
            }

            if (this.receiverPhone.value === "") {
                this.receiverPhone.isValid = false;
                this.receiverPhone.errorMessage =
                    "Vui lòng nhập số điện thoại người nhận";
                isValid = false;
            } else {
                this.receiverPhone.isValid = true;
                this.receiverPhone.errorMessage = "";
            }

            if (this.senderDetailAddress.value === "") {
                this.senderDetailAddress.isValid = false;
                this.senderDetailAddress.errorMessage =
                    "Vui lòng nhập địa chỉ chi tiết người gửi";
                isValid = false;
            } else {
                this.senderDetailAddress.isValid = true;
                this.senderDetailAddress.errorMessage = "";
            }

            if (this.receiverDetailAddress.value === "") {
                this.receiverDetailAddress.isValid = false;
                this.receiverDetailAddress.errorMessage =
                    "Vui lòng nhập địa chỉ chi tiết người nhận";
                isValid = false;
            } else {
                this.receiverDetailAddress.isValid = true;
                this.receiverDetailAddress.errorMessage = "";
            }

            if (this.totalPrice.value === "") {
                this.totalPrice.isValid = false;
                this.totalPrice.errorMessage = "Vui lòng nhập cước phí";
                isValid = false;
            } else {
                this.totalPrice.isValid = true;
                this.totalPrice.errorMessage = "";
            }

            return isValid;
        },
    },
    mounted() {
        //call api lấy dữ liệu các tỉnh/huyện/xã
        this.setProvinces();
        this.$store.dispatch("address/getDistricts");
        this.$store.dispatch("address/getWards");
        this.getLocationId();
    },
};
</script>
