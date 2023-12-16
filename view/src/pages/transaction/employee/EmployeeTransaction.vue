<template>
    <main class="flex">
        <!-- Side bar  -->
        <div
            class="basis-1/4 w-full min-h-screen pt-20 p-10 bg-orange-100 flex flex-col gap-10"
        >
            <!-- Giới thiệu thông tin  -->
            <div class="flex flex-col items-center gap-2 p-4 rounded">
                <h1
                    class="text-sm sm:text-base md:text-lg lg:text-xl font-bold"
                >
                    Nhân viên giao dịch
                </h1>
                <img
                    src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    alt="user logo"
                    class="h-14 w-14 rounded-full"
                />

                <p class="text-xs md:text-sm lg:text-base">{{ userEmail }}</p>

                <p class="text-xs md:text-sm lg:text-base">
                    ID nhân viên: {{ userId }}
                </p>

                <p class="text-xs md:text-sm lg:text-base">
                    Địa điểm làm việc: Cầu Giấy, Hà Nội
                </p>
            </div>

            <!-- List các danh mục  -->
            <div class="flex flex-col gap-10">
                <!-- Quản lý đơn hàng  -->
                <div class="flex flex-col gap-2">
                    <div
                        class="flex justify-between items-center text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 text-white font-semibold bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500"
                        @click="toggleManagePackage"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-motorcycle"
                            class="text-sm sm:text-base md:text-xl lg:text-2xl select-none"
                        />
                        <h1 class="select-none">Quản lý vận chuyển</h1>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            v-if="!isOpenManagePackage"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-up"
                            v-else
                        />
                    </div>

                    <transition name="route">
                        <ul
                            class="flex flex-col gap-2"
                            v-if="isOpenManagePackage"
                        >
                            <router-link
                                to="createAccountLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-user-plus"
                                />
                                Tạo đơn giao hàng
                            </router-link>
                            <router-link
                                to="listAccountLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-motorcycle"
                                />
                                Giao hàng
                            </router-link>
                        </ul>
                    </transition>
                </div>

                <!-- Quản lý kho  -->
                <div class="flex flex-col gap-2">
                    <div
                        class="flex justify-between items-center text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 text-white font-semibold bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500"
                        @click="toggleManageWarehouse"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-warehouse"
                            class="text-sm sm:text-base md:text-xl lg:text-2xl select-none"
                        />
                        <h1 class="select-none">Quản lý kho</h1>
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-down"
                            v-if="!isOpenManageWarehouse"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-chevron-up"
                            v-else
                        />
                    </div>

                    <transition name="route">
                        <ul
                            class="flex flex-col gap-2"
                            v-if="isOpenManageWarehouse"
                        >
                            <router-link
                                to="createWarehouseLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-cubes"
                                />
                                Danh sách đơn hàng
                            </router-link>
                            <router-link
                                to="createWarehouseLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-truck-fast"
                                />
                                Đơn về từ điểm tập kết
                            </router-link>
                            <router-link
                                to="listWarehouseLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-paper-plane"
                                />
                                Đơn đi điểm tập kết
                            </router-link>
                            <router-link
                                to="listWarehouseLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-cart-plus"
                                />
                                Tạo đơn hàng
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
                                to="statisticSentLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-paper-plane"
                                />
                                Giao thành công
                            </router-link>
                            <router-link
                                to="statisticReceivedLink"
                                class="select-none px-4 py-2 border-2 border-black font-semibold rounded hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-rotate-left"
                                />
                                Giao thất bại
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
    props: ["leader_id"],
    data() {
        return {
            isOpenManageSystem: false,
            isOpenManageWarehouse: false,
            isOpenManageStatistic: false,
            isOpenManagePackage: false,
        };
    },
    methods: {
        toggleManageSystem() {
            this.isOpenManageSystem = !this.isOpenManageSystem;
        },
        toggleManageWarehouse() {
            this.isOpenManageWarehouse = !this.isOpenManageWarehouse;
        },
        toggleManageStatistic() {
            this.isOpenManageStatistic = !this.isOpenManageStatistic;
        },
        toggleManagePackage() {
            this.isOpenManagePackage = !this.isOpenManagePackage;
        },
    },
    computed: {
        userEmail() {
            return this.$store.getters.getUserEmail;
        },
        userId() {
            return this.$store.getters.getUserId;
        },
    },
};
</script>

<style scoped></style>
