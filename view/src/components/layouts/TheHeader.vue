<template>
    <header
        class="bg-indigo-500 h-16 lg:h-20 fixed top-0 right-0 left-0 flex items-center justify-between px-10 shadow z-10"
    >
        <nav class="flex items-center gap-8">
            <router-link to="/homepage">
                <img
                    src="../../assets/images/logo_magicpost.jpg"
                    alt="logo magicpost"
                    class="h-16 w-16 rounded-full hover:cursor-pointer"
                />
            </router-link>

            <ul
                class="flex items-center gap-6 text-xs md:text-sm lg:text-base font-semibold text-white"
            >
                <li>
                    <router-link class="hover:cursor-pointer" to="/homepage"
                        >Trang chủ</router-link
                    >
                </li>
                <li v-if="!isManager">
                    <a
                        class="hover:cursor-pointer"
                        @click.prevent="scrollToElement('search-service')"
                        >Tra cứu
                    </a>
                </li>
                <li v-if="!isManager">
                    <router-link
                        :to="packageHistoryLink"
                        class="hover:cursor-pointer"
                        >Lịch sử đơn hàng</router-link
                    >
                </li>
                <li v-if="!isManager">
                    <a
                        class="hover:cursor-pointer"
                        @click.prevent="scrollToElement('service-list')"
                        >Dịch vụ</a
                    >
                </li>
                <li v-if="isManager">
                    <router-link to="/manager" class="hover:cursor-pointer"
                        >Quản lý</router-link
                    >
                </li>
            </ul>
        </nav>

        <router-link
            class="hover:cursor-pointer lg:text-base md:text-sm text-xs font-semibold text-white"
            to="/auth"
            v-if="!isLoggedIn"
            >Đăng nhập / Đăng ký</router-link
        >

        <div
            class="flex items-center gap-4 py-2 px-4 bg-teal-500 rounded-xl hover:cursor-pointer after:content-[''] after:absolute after:w-full after:h-20"
            @mouseover="isShowUserInfo = true"
            @mouseleave="isShowUserInfo = false"
            v-else
        >
            <img
                src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                alt="user avt"
                class="h-10 w-10 rounded-full"
            />
            <p class="text-xs md:text-sm lg:text-base font-semibold text-white">
                {{ userEmail }}
            </p>
            <font-awesome-icon
                icon="fa-solid fa-chevron-down"
                class="text-xs md:text-sm lg:text-base font-semibold text-white"
            />

            <ul
                class="absolute top-full right-0 w-56 md:w-64 lg:w-80 rounded-lg shadow-md z-10 bg-white flex flex-col items-center justify-center px-4"
                v-if="isShowUserInfo"
            >
                <base-list
                    icon="fa-solid fa-arrow-right-from-bracket"
                    title="Đăng xuất"
                    @click="logout"
                />
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isShowUserInfo: false,
        };
    },
    methods: {
        async logout() {
            await this.$store.dispatch("logout");
            this.$router.push("/auth");
        },
        scrollToElement(elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
        userEmail() {
            return this.$store.getters.getUserEmail;
        },
        isManager() {
            return this.$store.getters.isManager;
        },
        packageHistoryLink() {
            const userId = this.$store.getters.getUserId;
            return `/customer/${userId}`;
        },
    },
};
</script>
