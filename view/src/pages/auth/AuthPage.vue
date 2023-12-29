<template>
    <main class="wrapper flex h-screen items-center justify-center pt-20">
        <!-- login form  -->
        <form
            @submit.prevent="login"
            class="form flex flex-col items-center gap-8 rounded-lg px-20 py-5 text-white shadow-2xl"
            v-if="loginForm"
        >
            <h1 class="xs:text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Đăng nhập
            </h1>
            <div class="flex flex-col gap-3 text-xs md:text-sm lg:text-base">
                <div class="flex flex-col gap-1">
                    <label class="max-w-max" for="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        class="w-full border border-gray-400 p-2 text-black"
                        v-model="email.value"
                        @input="email.isValid = true"
                    />
                    <span
                        class="text-xs text-rose-400 lg:text-sm"
                        v-if="!email.isValid"
                        >{{ email.messageInvalid }}</span
                    >
                </div>
                <div class="flex flex-col gap-1">
                    <label class="max-w-max" for="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Mật khẩu"
                        class="w-full border border-gray-400 p-2 text-black"
                        v-model="password.value"
                        @input="password.isValid = true"
                    />
                    <span
                        class="text-xs text-rose-400 lg:text-sm"
                        v-if="!password.isValid"
                        >{{ password.messageInvalid }}</span
                    >
                </div>
                <div class="flex items-center gap-1">
                    <input type="checkbox" id="remember" />
                    <label for="remember">Lưu mật khẩu</label>
                </div>
                <button
                    class="mt-2 rounded-md bg-white p-2 font-bold text-black hover:cursor-pointer hover:opacity-90"
                >
                    Đăng nhập
                </button>
            </div>
            <span class="flex gap-1 text-xs md:text-sm lg:text-base"
                >Bạn chưa có tài khoản?
                <p
                    class="font-bold italic text-green-500 underline hover:cursor-pointer hover:text-green-600"
                    @click="swithForm('register')"
                >
                    Đăng ký
                </p></span
            >
        </form>

        <!-- register form  -->
        <form
            @submit.prevent="register"
            class="form flex flex-col items-center gap-8 rounded-lg px-20 py-5 text-white shadow-2xl"
            v-else-if="registerForm"
        >
            <h1 class="xs:text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
                Đăng ký
            </h1>
            <div class="flex flex-col gap-3 text-xs md:text-sm lg:text-base">
                <div class="flex flex-col gap-1">
                    <label class="max-w-max" for="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        class="w-full border border-gray-400 p-2 text-black"
                        v-model="email.value"
                        @input="email.isValid = true"
                    />
                    <span
                        class="text-xs text-rose-400 lg:text-sm"
                        v-if="!email.isValid"
                        >{{ email.messageInvalid }}</span
                    >
                </div>
                <div class="flex flex-col gap-1">
                    <label class="max-w-max" for="password">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Mật khẩu"
                        class="w-full border border-gray-400 p-2 text-black"
                        v-model="password.value"
                        @input="password.isValid = true"
                    />
                    <span
                        class="text-xs text-rose-400 lg:text-sm"
                        v-if="!password.isValid"
                        >{{ password.messageInvalid }}</span
                    >
                </div>
                <div class="flex flex-col gap-1">
                    <label class="max-w-max" for="confirm-password"
                        >Nhập lại mật khẩu</label
                    >
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Mật khẩu"
                        class="w-full border border-gray-400 p-2 text-black"
                        v-model="confirmPassword.value"
                        @input="confirmPassword.isValid = true"
                    />
                    <span
                        class="text-xs text-rose-400 lg:text-sm"
                        v-if="!confirmPassword.isValid"
                        >{{ confirmPassword.messageInvalid }}</span
                    >
                </div>
                <div class="flex flex-col">
                    <span class="flex items-center gap-1">
                        <input
                            type="checkbox"
                            id="term"
                            v-model="term.value"
                            @change="term.isValid = true"
                        />
                        <label for="term"
                            >Tôi đồng ý với các điều khoản của
                            <a
                                href="#"
                                class="italic text-green-500 underline hover:cursor-pointer hover:text-green-600"
                                >Magic Post</a
                            ></label
                        >
                    </span>
                    <span
                        class="text-xs text-yellow-300 lg:text-sm"
                        v-if="!term.isValid"
                        >{{ term.messageInvalid }}</span
                    >
                </div>
                <button
                    class="mt-2 rounded-md bg-white p-2 font-bold text-black hover:cursor-pointer hover:opacity-90"
                >
                    Đăng ký
                </button>
            </div>
            <span class="flex gap-1 text-xs md:text-sm lg:text-base"
                >Bạn đã có tài khoản?
                <p
                    class="font-bold italic text-green-500 underline hover:cursor-pointer hover:text-green-600"
                    @click="swithForm('login')"
                >
                    Đăng nhập
                </p></span
            >
        </form>

        <!-- loading icon  -->
        <base-spinner v-if="isLoading"></base-spinner>

        <!-- error dialog  -->
        <base-dialog
            :show="!!error.title"
            :title="error.title"
            @close="closeDialog"
            @exit="closeDialog"
        >
            <p>
                {{ error.message }} <br />
                Vui lòng thử lại
            </p>
        </base-dialog>

        <!-- success dialog  -->
        <base-dialog
            :show="!!success"
            :title="success"
            @close="confirmSuccess"
            @exit="confirmSuccess"
        >
            <p>Bạn có thể sử dụng tài khoản này để đăng nhập vào MagicPost</p>
        </base-dialog>
    </main>
</template>

<script>
export default {
    data() {
        return {
            loginForm: true,
            registerForm: false,
            email: {
                value: "",
                isValid: true,
                messageInvalid: "",
            },
            password: {
                value: "",
                isValid: true,
                messageInvalid: "",
            },
            confirmPassword: {
                value: "",
                isValid: true,
                messageInvalid: "",
            },
            term: {
                value: false,
                isValid: true,
                messageInvalid: "",
            },
            isLoading: false,
            error: {
                title: null,
                message: null,
            },
            success: null,
        };
    },
    methods: {
        swithForm(type) {
            this.resetValidate();

            if (type === "login") {
                this.loginForm = true;
                this.registerForm = false;
            } else {
                this.loginForm = false;
                this.registerForm = true;
            }
        },
        login() {
            if (this.loginValidate) {
                console.log("form login is valid");
            } else {
                console.log("form login is invalid");
            }
        },
        async register() {
            if (this.registerValidate) {
                this.isLoading = true;
                console.log("loading register...");
                const payload = {
                    email: this.email.value,
                    password: this.password.value,
                };
                try {
                    await this.$store.dispatch("signup", payload);
                    console.log("resgister success");
                    this.success = "Đăng ký thành công!";
                    this.resetValidate();
                } catch (error) {
                    this.error.message = error.message;
                    this.error.title = "Đăng ký thất bại!";
                    console.log("resgister fail");
                }
                this.isLoading = false;
            }
        },
        async login() {
            if (this.loginValidate) {
                this.isLoading = true;
                console.log("loading login...");
                const payload = {
                    email: this.email.value,
                    password: this.password.value,
                };
                try {
                    await this.$store.dispatch("login", payload);
                    console.log("login success");
                    this.resetValidate();

                    const redirect = this.$route.query.redirect || "/";
                    this.$router.push(redirect);
                } catch (error) {
                    this.error.message = error.message;
                    this.error.title = "Đăng nhập thất bại!";
                    console.log(error.message);
                    console.log("login fail");
                }
                this.isLoading = false;
            }
        },
        resetValidate() {
            this.email.isValid = true;
            this.email.messageInvalid = "";
            this.email.value = "";
            this.password.isValid = true;
            this.password.messageInvalid = "";
            this.password.value = "";
            this.confirmPassword.isValid = true;
            this.confirmPassword.messageInvalid = "";
            this.confirmPassword.value = "";
            this.term.isValid = true;
            this.term.messageInvalid = "";
            this.term.value = false;
        },
        closeDialog() {
            this.error.title = null;
            this.error.message = null;
            this.success = null;
        },
        confirmSuccess() {
            this.success = null;
            this.swithForm("login");
        },
    },
    computed: {
        registerValidate() {
            //validate email
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (this.email.value.trim() === "") {
                this.email.isValid = false;
                this.email.messageInvalid = "Email không được để trống";
            } else if (!emailRegex.test(this.email.value)) {
                this.email.isValid = false;
                this.email.messageInvalid = "Email không hợp lệ";
            } else {
                this.email.isValid = true;
            }

            //validate password
            if (this.password.value.trim() === "") {
                this.password.isValid = false;
                this.password.messageInvalid = "Mật khẩu không được để trống";
            } else if (this.password.value.trim().length < 6) {
                this.password.isValid = false;
                this.password.messageInvalid =
                    "Mật khẩu phải có ít nhất 6 ký tự";
            } else {
                this.password.isValid = true;
            }

            //validate confirm password
            if (this.confirmPassword.value.trim() === "") {
                this.confirmPassword.isValid = false;
                this.confirmPassword.messageInvalid =
                    "Mật khẩu không được để trống";
            } else if (this.confirmPassword.value.trim().length < 6) {
                this.confirmPassword.isValid = false;
                this.confirmPassword.messageInvalid =
                    "Mật khẩu phải có ít nhất 6 ký tự";
            } else if (
                this.confirmPassword.value.trim() !== this.password.value.trim()
            ) {
                this.confirmPassword.isValid = false;
                this.confirmPassword.messageInvalid = "Mật khẩu không khớp";
                console.log("deo khop");
            } else {
                this.confirmPassword.isValid = true;
            }

            //validate term
            if (!this.term.value) {
                this.term.isValid = false;
                this.term.messageInvalid =
                    "Bạn phải đồng ý với điều khoản của Magic Post";
            } else {
                this.term.isValid = true;
            }

            return (
                this.email.isValid &&
                this.password.isValid &&
                this.confirmPassword.isValid &&
                this.term.isValid
            );
        },
        loginValidate() {
            //validate email
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (this.email.value.trim() === "") {
                this.email.isValid = false;
                this.email.messageInvalid = "Email không được để trống";
            } else if (!emailRegex.test(this.email.value)) {
                this.email.isValid = false;
                this.email.messageInvalid = "Email không hợp lệ";
            } else {
                this.email.isValid = true;
            }

            //validate password
            if (this.password.value.trim() === "") {
                this.password.isValid = false;
                this.password.messageInvalid = "Mật khẩu không được để trống";
            } else if (this.password.value.trim().length < 6) {
                this.password.isValid = false;
                this.password.messageInvalid =
                    "Mật khẩu phải có ít nhất 6 ký tự";
            } else {
                this.password.isValid = true;
            }

            return this.email.isValid && this.password.isValid;
        },
    },
};
</script>

<style scoped>
.wrapper {
    background-image: url("../../assets/images/auth_background.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.form {
    background-color: #4c4ec2;
}
</style>
