<template>
    <div
    class="mt-0 flex w-full basis-3/4 flex-col items-center justify-center bg-indigo-300 py-2 xl:mt-20 xl:py-0"
    >
        <section
        class="flex w-4/5 flex-col items-center gap-4 rounded-xl bg-indigo-400 px-10 py-4 lg:w-2/3 xl:w-1/2"
        >
            <h1
                class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold select-none text-white"
            >
                Tạo tài khoản
            </h1>
            <form class="flex flex-col gap-2 w-full">
                <div class="flex flex-col gap-1">
                    <label for="role" class="lg:text-base md:text-sm text-xs"
                        >Vai trò</label
                    >
                    <select
                        name="role"
                        id="role"
                        class="px-4 py-2 text-xs md:text-sm lg:text-base xl:text-lg border outline-green-300 rounded"
                        v-model="role.value"
                    >
                        <option value="Trưởng điểm tập kết">
                            Trưởng điểm tập kết
                        </option>
                        <option value="Trưởng điểm giao dịch">
                            Trưởng điểm giao dịch
                        </option>
                    </select>
                </div>

                <div class="flex flex-col gap-1">
                    <span class="flex items-center gap-2">
                        <label
                            for="location"
                            class="lg:text-base md:text-sm text-xs"
                            >Địa điểm làm việc</label
                        >
                        <span
                            class="lg:text-sm text-xs text-yellow-300"
                            v-if="
                                !selectedProvince.isValid ||
                                !selectedDistrict.isValid
                            "
                            >{{
                                selectedProvince.errorMessage ||
                                selectedDistrict.errorMessage
                            }}</span
                        >
                    </span>
                    <div class="w-full grid grid-cols-2 gap-4">
                        <select
                            id="province"
                            class="px-4 py-2 text-xs md:text-sm lg:text-base xl:text-lg border outline-green-300 rounded"
                            v-model="selectedProvince.value"
                            @change="handleChangeProvince"
                        >
                            <option value="Tỉnh/Thành phố">
                                Tỉnh/Thành phố
                            </option>
                            <option
                                v-for="province in provinces"
                                :value="province.name"
                                :key="province.code"
                            >
                                {{ province.name }}
                            </option>
                        </select>

                        <select
                            id="district"
                            class="px-4 py-2 text-xs md:text-sm lg:text-base xl:text-lg border outline-green-300 rounded"
                            v-if="role.value !== 'Trưởng điểm tập kết'"
                            v-model="selectedDistrict.value"
                            @change="selectedDistrict.errorMessage = ''"
                        >
                            <option value="Quận/Huyện">Quận/Huyện</option>
                            <option
                                v-for="district in districts"
                                :value="district.name"
                                :key="district.code"
                            >
                                {{ district.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <span class="flex items-center gap-2">
                        <label
                            for="email"
                            class="lg:text-base md:text-sm text-xs"
                            >Email</label
                        >
                        <span
                            class="lg:text-sm text-xs text-yellow-300"
                            v-if="email.errorMessage"
                            >{{ email.errorMessage }}</span
                        >
                    </span>
                    <input
                        type="text"
                        id="email"
                        class="px-4 py-2 text-xs md:text-sm lg:text-base xl:text-lg border outline-green-300 rounded"
                        @input="email.errorMessage = ''"
                        v-model="email.value"
                    />
                </div>

                <div class="flex flex-col gap-1">
                    <span class="flex items-center gap-2">
                        <label
                            for="password"
                            class="lg:text-base md:text-sm text-xs"
                            >Mật khẩu</label
                        >
                        <span
                            class="lg:text-sm text-xs text-yellow-300"
                            v-if="password.errorMessage"
                        >
                            {{ password.errorMessage }}</span
                        >
                    </span>
                    <input
                        type="password"
                        id="password"
                        class="px-4 py-2 text-xs md:text-sm lg:text-base xl:text-lg border outline-green-300 rounded"
                        @input="password.errorMessage = ''"
                        v-model="password.value"
                    />
                </div>

                <div class="flex flex-col gap-1">
                    <span class="flex items-center gap-2">
                        <label
                            for="confirm-password"
                            class="lg:text-base md:text-sm text-xs"
                            >Nhập lại mật khẩu</label
                        >
                        <span
                            class="lg:text-sm text-xs text-yellow-300"
                            v-if="confirmPassword.errorMessage"
                            >{{ confirmPassword.errorMessage }}</span
                        >
                    </span>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder=""
                        class="px-4 py-2 text-xs md:text-sm lg:text-base xl:text-lg border outline-green-300 rounded"
                        @input="confirmPassword.errorMessage = ''"
                        v-model="confirmPassword.value"
                    />
                </div>

                <span
                    class="bg-black px-4 py-2 lg:text-lg md:text-base sm:text-sm text-xs text-white font-bold rounded mt-4 hover:cursor-pointer hover:opacity-90 text-center"
                    @click="handleSubmit"
                >
                    Tạo tài khoản
                </span>
            </form>
        </section>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-dialog
            :show="!!notification.error"
            title="Tạo tài khoản trưởng điểm thất bại"
            @close="notification.error = ''"
        >
            <p>{{ notification.error }}</p>
        </base-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            role: {
                value: "Trưởng điểm tập kết",
                isValid: true,
                errorMessage: "",
            },
            provinces: [],
            selectedProvince: {
                value: "Tỉnh/Thành phố",
                isValid: true,
                errorMessage: "",
            },
            districts: [],
            selectedDistrict: {
                value: "Quận/Huyện",
                isValid: true,
                errorMessage: "",
            },
            email: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            password: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            confirmPassword: {
                value: "",
                isValid: true,
                errorMessage: "",
            },
            isLoading: false,
            notification: {
                error: "",
                success: "",
            },
        };
    },
    methods: {
        async setProvince() {
            await this.$store.dispatch("address/getProvinces");
            this.provinces = this.$store.getters["address/getProvinces"];
        },
        async handleChangeProvince() {
            this.selectedProvince.errorMessage = "";

            this.districts = [];
            this.selectedDistrict.value = "Quận/Huyện";

            let provinceCode = "";
            for (let province of this.provinces) {
                if (province.name === this.selectedProvince.value) {
                    provinceCode = province.code;
                    break;
                }
            }

            const districts = this.$store.getters["address/getDistricts"];

            for (const district in districts) {
                if (districts[district].province_code === provinceCode) {
                    this.districts.push(districts[district]);
                }
            }
        },
        async handleSubmit() {
            if (this.validateForm) {
                // Tạo tài khoản trưởng điểm tập kết
                if (this.role.value === "Trưởng điểm tập kết") {
                    const formData = {
                        email: this.email.value,
                        name: "",
                        password: this.password.value,
                        province: this.selectedProvince.value,
                    };

                    try {
                        this.isLoading = true;
                        await this.$store.dispatch(
                            "manager/createAggregationLeader",
                            formData
                        );
                        console.log("create aggregation leader success");
                        this.$notify({
                            title: "Đăng ký thành công!",
                        });
                        this.resetForm();
                    } catch (err) {
                        this.notification.error = err;
                    }
                }
                // Tạo tài khoản trưởng điểm giao dịch
                else if (this.role.value === "Trưởng điểm giao dịch") {
                    const formData = {
                        email: this.email.value,
                        name: "",
                        password: this.password.value,
                        province: this.selectedProvince.value,
                        district: this.selectedDistrict.value,
                    };

                    try {
                        this.isLoading = true;
                        await this.$store.dispatch(
                            "manager/createTransactionLeader",
                            formData
                        );
                        console.log("create transaction leader success");
                        this.$notify({
                            title: "Đăng ký thành công!",
                        });
                        this.resetForm();
                    } catch (err) {
                        this.notification.error = err;
                    }
                } else {
                    console.log("invalid");
                    return;
                }
                this.isLoading = false;
            } else {
                console.log("invalid");
                return;
            }
        },
        resetForm() {
            this.role.value = "Trưởng điểm tập kết";
            this.selectedProvince.value = "Tỉnh/Thành phố";
            this.selectedDistrict.value = "Quận/Huyện";
            this.email.value = "";
            this.password.value = "";
            this.confirmPassword.value = "";

            this.role.isValid = true;
            this.selectedProvince.isValid = true;
            this.selectedDistrict.isValid = true;
            this.email.isValid = true;
            this.password.isValid = true;
            this.confirmPassword.isValid = true;

            this.role.errorMessage = "";
            this.selectedProvince.errorMessage = "";
            this.selectedDistrict.errorMessage = "";
            this.email.errorMessage = "";
            this.password.errorMessage = "";
            this.confirmPassword.errorMessage = "";
        },
    },
    computed: {
        validateForm() {
            let isValid = true;
            if (this.role.value.trim() === "Trưởng điểm giao dịch") {
                if (this.selectedProvince.value.trim() === "Tỉnh/Thành phố") {
                    this.selectedProvince.isValid = false;
                    this.selectedProvince.errorMessage =
                        "Vui lòng chọn tỉnh/thành phố";
                    isValid = false;
                }

                if (this.selectedDistrict.value.trim() === "Quận/Huyện") {
                    this.selectedDistrict.isValid = false;
                    this.selectedDistrict.errorMessage =
                        "Vui lòng chọn quận/huyện";
                    isValid = false;
                }
            } else {
                if (this.selectedProvince.value.trim() === "Tỉnh/Thành phố") {
                    this.selectedProvince.isValid = false;
                    this.selectedProvince.errorMessage =
                        "Vui lòng chọn tỉnh/thành phố";
                    isValid = false;
                }
            }

            //validate email
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (this.email.value.trim() === "") {
                this.email.isValid = false;
                this.email.errorMessage = "Email không được để trống";
                isValid = false;
            } else if (!emailRegex.test(this.email.value)) {
                this.email.isValid = false;
                this.email.errorMessage = "Email không hợp lệ";
                isValid = false;
            } else {
                this.email.isValid = true;
            }

            //validate password
            if (this.password.value.trim() === "") {
                this.password.isValid = false;
                this.password.errorMessage = "Mật khẩu không được để trống";
                isValid = false;
            } else if (this.password.value.trim().length < 6) {
                this.password.isValid = false;
                this.password.errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
                isValid = false;
            } else {
                this.password.isValid = true;
            }

            //validate confirm password
            if (this.confirmPassword.value.trim() === "") {
                this.confirmPassword.isValid = false;
                this.confirmPassword.errorMessage =
                    "Mật khẩu không được để trống";
                isValid = false;
            } else if (this.confirmPassword.value.trim().length < 6) {
                this.confirmPassword.isValid = false;
                this.confirmPassword.errorMessage =
                    "Mật khẩu phải có ít nhất 6 ký tự";
                isValid = false;
            } else if (
                this.confirmPassword.value.trim() !== this.password.value.trim()
            ) {
                this.confirmPassword.isValid = false;
                this.confirmPassword.errorMessage = "Mật khẩu không khớp";
                isValid = false;
            } else {
                this.confirmPassword.isValid = true;
            }

            return isValid;
        },
    },
    mounted() {
        this.setProvince();
        this.$store.dispatch("address/getDistricts");
    },
};
</script>
