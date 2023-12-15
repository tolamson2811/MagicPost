<template>
    <main class="flex">
        <!-- Side bar  -->
        <div
            class="basis-1/4 w-full min-h-screen pt-20 p-10 bg-orange-100 flex flex-col gap-16"
        >
            <!-- Giới thiệu thông tin  -->
            <div class="flex items-center gap-4 p-4 rounded">
                <img
                    src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    alt="user logo"
                    class="h-14 w-14 rounded-full"
                />
                <span class="text-sm sm:text-base md:text-lg lg:text-xl">
                    <p>{{ userEmail }}</p>
                    <h1
                        class="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold"
                    >
                        Lãnh đạo công ty
                    </h1>
                </span>
            </div>

            <!-- List các danh mục  -->
            <div class="flex flex-col gap-10">
                <!-- Quản lý hệ thống  -->
                <div class="flex flex-col gap-2">
                    <div
                        class="flex justify-between items-center text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 text-white font-semibold bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500"
                        @click="toggleManageSystem"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-bars"
                            class="text-sm sm:text-base md:text-xl lg:text-2xl select-none"
                        />
                        <h1 class="select-none">Quản lý hệ thống</h1>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            v-if="!isOpenManageSystem"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-up"
                            v-else
                        />
                    </div>

                    <transition name="route">
                        <ul
                            class="flex flex-col gap-2"
                            v-if="isOpenManageSystem"
                        >
                            <router-link
                                to="/manager/system/transaction"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-tent-arrow-left-right"
                                />
                                Điểm giao dịch
                            </router-link>
                            <router-link
                                to="/manager/system/aggregation"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-warehouse"
                                />
                                Điểm tập kết
                            </router-link>
                        </ul>
                    </transition>
                </div>

                <!-- Quản lý tài khoản  -->
                <div class="flex flex-col gap-2">
                    <div
                        class="flex justify-between items-center text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 text-white font-semibold bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500"
                        @click="toggleManageAccount"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-certificate"
                            class="text-sm sm:text-base md:text-xl lg:text-2xl select-none"
                        />
                        <h1 class="select-none">Quản lý tài khoản</h1>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            v-if="!isOpenManageAccount"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-up"
                            v-else
                        />
                    </div>

                    <transition name="route">
                        <ul
                            class="flex flex-col gap-2"
                            v-if="isOpenManageAccount"
                        >
                            <router-link
                                to="/manager/account/create"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-user-plus"
                                />
                                Tạo tài khoản
                            </router-link>
                            <router-link
                                to="/manager/account/list"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-rectangle-list"
                                />
                                Danh sách tài khoản
                            </router-link>
                        </ul>
                    </transition>
                </div>

                <!-- Thống kê số đơn hàng đến, đi của từng điểm giao dịch, tập kết  -->
                <div class="flex flex-col gap-2">
                    <div
                        class="flex justify-between items-center text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 text-white font-semibold bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500"
                        @click="toggleManageStatistic"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-filter"
                            class="text-sm sm:text-base md:text-xl lg:text-2xl select-none"
                        />
                        <h1 class="select-none">Thống kê hàng hóa</h1>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            v-if="!isOpenManageStatistic"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-up"
                            v-else
                        />
                    </div>

                    <transition name="route">
                        <ul
                            class="flex flex-col gap-2"
                            v-if="isOpenManageStatistic"
                        >
                            <router-link
                                to="/manager/statistic/transaction"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-tent-arrow-left-right"
                                />
                                Điểm giao dịch
                            </router-link>
                            <router-link
                                to="/manager/statistic/aggregation"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-warehouse"
                                />
                                Điểm tập kết
                            </router-link>
                        </ul>
                    </transition>
                </div>
            </div>
        </div>

        <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
                <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
    </main>
</template>

<script>
export default {
    data() {
        return {
            isOpenManageSystem: false,
            isOpenManageAccount: false,
            isOpenManageStatistic: false,
        };
    },
    methods: {
        toggleManageSystem() {
            this.isOpenManageSystem = !this.isOpenManageSystem;
        },
        toggleManageAccount() {
            this.isOpenManageAccount = !this.isOpenManageAccount;
        },
        toggleManageStatistic() {
            this.isOpenManageStatistic = !this.isOpenManageStatistic;
        },
    },
    computed: {
        userEmail() {
            return this.$store.getters.getUserEmail;
        },
    },
};
</script>

<style scoped></style>
