<template>
    <main class="flex flex-col xl:flex-row">
        <!-- Side bar  -->
        <div
            class="flex w-full basis-1/4 flex-col gap-4 bg-orange-100 p-10 pt-20 lg:min-h-screen lg:gap-8 xl:gap-10"
        >
            <!-- Giới thiệu thông tin  -->
            <div class="flex flex-col items-center gap-2 rounded p-4">
                <h1
                    class="text-sm font-bold sm:text-base md:text-lg lg:text-xl"
                >
                    Lãnh đạo công ty
                </h1>
                <img
                    src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    alt="user logo"
                    class="h-14 w-14 rounded-full"
                />
                <p class="text-xs md:text-sm lg:text-base">{{ userEmail }}</p>
            </div>

            <!-- List các danh mục  -->
            <div class="flex flex-col gap-4 lg:gap-8 xl:gap-10">
                <!-- Quản lý hệ thống  -->
                <div class="flex flex-col gap-2">
                    <div
                        class="flex items-center justify-between bg-indigo-400 px-4 py-2 text-xs font-semibold text-white hover:cursor-pointer hover:bg-indigo-500 sm:text-sm md:text-base lg:text-lg"
                        @click="toggleManageSystem"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-bars"
                            class="select-none text-sm sm:text-base md:text-xl lg:text-2xl"
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
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-blue-300"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-tent-arrow-left-right"
                                />
                                Điểm giao dịch
                            </router-link>
                            <router-link
                                to="/manager/system/aggregation"
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-blue-300"
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
                        class="flex items-center justify-between bg-indigo-400 px-4 py-2 text-xs font-semibold text-white hover:cursor-pointer hover:bg-indigo-500 sm:text-sm md:text-base lg:text-lg"
                        @click="toggleManageAccount"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-certificate"
                            class="select-none text-sm sm:text-base md:text-xl lg:text-2xl"
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
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-blue-300"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-user-plus"
                                />
                                Tạo tài khoản
                            </router-link>
                            <router-link
                                to="/manager/account/list"
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-blue-300"
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
                        class="flex items-center justify-between bg-indigo-400 px-4 py-2 text-xs font-semibold text-white hover:cursor-pointer hover:bg-indigo-500 sm:text-sm md:text-base lg:text-lg"
                        @click="toggleManageStatistic"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-filter"
                            class="select-none text-sm sm:text-base md:text-xl lg:text-2xl"
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
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-blue-300"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-tent-arrow-left-right"
                                />
                                Điểm giao dịch
                            </router-link>
                            <router-link
                                to="/manager/statistic/aggregation"
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-blue-300"
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
