<template>
    <div
        class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex justify-center items-center"
    >
        <section
            class="w-1/2 px-10 py-4 bg-indigo-400 rounded-xl flex flex-col items-center gap-4"
        >
            <h1
                class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold select-none text-white"
            >
                Tạo tài khoản giao dịch viên
            </h1>
            <form class="flex flex-col gap-2 w-full">
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
                        class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
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
                        class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
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
                        class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
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
    </div>
</template>

<script>
export default {
    data() {
        return {
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
        };
    },
    methods: {
        handleSubmit() {
            if (this.validateForm) {
                console.log("valid");
                const formData = {
                    email: this.email.value,
                    password: this.password.value,
                };

                console.log(formData);

                this.resetForm();
            } else {
                console.log("invalid");
                return;
            }
        },
        resetForm() {
            this.email.value = "";
            this.password.value = "";
            this.confirmPassword.value = "";

            this.email.isValid = true;
            this.password.isValid = true;
            this.confirmPassword.isValid = true;

            this.email.errorMessage = "";
            this.password.errorMessage = "";
            this.confirmPassword.errorMessage = "";
        },
    },
    computed: {
        validateForm() {
            let isValid = true;

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
};
</script>
