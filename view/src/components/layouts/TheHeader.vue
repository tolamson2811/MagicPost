<template>
    <header
        class="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between bg-indigo-500 px-10 shadow lg:h-20"
    >
        <nav class="flex items-center gap-8">
            <router-link to="/homepage">
                <img
                    src="../../assets/images/logo_magicpost.jpg"
                    alt="logo magicpost"
                    class="h-12 w-12 rounded-full hover:cursor-pointer lg:h-16 lg:w-16"
                />
            </router-link>

            <ul
                class="flex items-center gap-6 text-xs font-semibold text-white md:text-sm lg:text-base"
            >
                <li>
                    <router-link class="hover:cursor-pointer" to="/homepage"
                        >Trang chủ</router-link
                    >
                </li>
                <!-- <li
                    v-if="
                        !isManager &&
                        !isTransactionLead &&
                        !isTransactionEmployee &&
                        !isAggregationLead &&
                        !isAggregationEmployee
                    "
                >
                    <a
                        class="hover:cursor-pointer"
                        @click.prevent="scrollToElement('search-service')"
                        >Tra cứu
                    </a>
                </li> -->
                <li
                    v-if="
                        !isManager &&
                        !isTransactionLead &&
                        !isTransactionEmployee &&
                        !isAggregationLead &&
                        !isAggregationEmployee
                    "
                >
                    <router-link
                        :to="packageHistoryLink"
                        class="hover:cursor-pointer"
                        >Lịch sử đơn hàng
                    </router-link>
                </li>
                <!-- <li
                    v-if="
                        !isManager &&
                        !isTransactionLead &&
                        !isTransactionEmployee &&
                        !isAggregationLead &&
                        !isAggregationEmployee
                    "
                >
                    <a
                        class="hover:cursor-pointer"
                        @click.prevent="scrollToElement('service-list')"
                        >Dịch vụ</a
                    >
                </li> -->
                <li v-if="isManager">
                    <router-link to="/manager" class="hover:cursor-pointer"
                        >Quản lý</router-link
                    >
                </li>
                <li v-if="isTransactionLead">
                    <router-link
                        :to="leaderTransactionLink"
                        class="hover:cursor-pointer"
                        >Quản lý</router-link
                    >
                </li>
                <li v-if="isTransactionEmployee">
                    <router-link
                        :to="employeeTransactionLink"
                        class="hover:cursor-pointer"
                        >Quản lý</router-link
                    >
                </li>
                <li v-if="isAggregationLead">
                    <router-link
                        :to="leaderAggregationLink"
                        class="hover:cursor-pointer"
                        >Quản lý</router-link
                    >
                </li>
                <li v-if="isAggregationEmployee">
                    <router-link
                        :to="employeeAggregationLink"
                        class="hover:cursor-pointer"
                        >Quản lý</router-link
                    >
                </li>
            </ul>
        </nav>

        <router-link
            class="text-xs font-semibold text-white hover:cursor-pointer md:text-sm lg:text-base"
            to="/auth"
            v-if="!isLoggedIn"
            >Đăng nhập / Đăng ký</router-link
        >

        <div
            class="hidden items-center gap-4 rounded-xl bg-cyan-700 px-4 py-2 after:absolute after:h-20 after:w-full after:content-[''] hover:cursor-pointer lg:flex"
            @mouseover="isShowUserInfo = true"
            @mouseleave="isShowUserInfo = false"
            v-else
        >
            <img
                src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                alt="user avt"
                class="h-10 w-10 rounded-full"
            />
            <p class="text-xs font-semibold text-white md:text-sm lg:text-base">
                {{ userEmail }}
            </p>
            <font-awesome-icon
                icon="fa-solid fa-chevron-down"
                class="text-xs font-semibold text-white md:text-sm lg:text-base"
            />

            <ul
                class="absolute right-0 top-full z-10 flex w-56 flex-col items-center justify-center rounded-lg bg-white px-4 shadow-md md:w-64 lg:w-80"
                v-if="isShowUserInfo"
            >
                <base-list
                    icon="fa-solid fa-arrow-right-from-bracket"
                    title="Đăng xuất"
                    @click="logout"
                />
            </ul>
        </div>

        <span
            class="block lg:hidden text-xs font-semibold text-green-400 hover:cursor-pointer md:text-sm lg:text-base"
            @click="logout"
            v-if="isLoggedIn"
        >
            Đăng xuất
        </span>
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
        isTransactionLead() {
            return this.$store.getters.isTransactionLead;
        },
        isTransactionEmployee() {
            return this.$store.getters.isTransactionEmployee;
        },
        isAggregationLead() {
            return this.$store.getters.isAggregationLead;
        },
        isAggregationEmployee() {
            return this.$store.getters.isAggregationEmployee;
        },
        packageHistoryLink() {
            const userId = this.$store.getters.getUserId;
            return `/customer/${userId}`;
        },
        leaderTransactionLink() {
            const userId = this.$store.getters.getUserId;
            return `/transaction/leader/${userId}`;
        },
        employeeTransactionLink() {
            const userId = this.$store.getters.getUserId;
            return `/transaction/employee/${userId}`;
        },
        leaderAggregationLink() {
            const userId = this.$store.getters.getUserId;
            return `/aggregation/leader/${userId}`;
        },
        employeeAggregationLink() {
            const userId = this.$store.getters.getUserId;
            return `/aggregation/employee/${userId}`;
        },
    },
};
</script>
