<template>
    <main class="flex">
        <!-- Side bar  -->
        <div
            class="flex min-h-screen w-full basis-1/4 flex-col gap-10 bg-orange-100 p-10 pt-20"
        >
            <!-- Giới thiệu thông tin  -->
            <div class="flex flex-col items-center gap-2 rounded p-4">
                <h1
                    class="text-sm font-bold sm:text-base md:text-lg lg:text-xl"
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
                    ID: {{ employee_info.id }}
                </p>

                <p class="text-xs md:text-sm lg:text-base">
                    {{ employee_info.location }}
                </p>
            </div>

            <!-- List các danh mục  -->
            <div class="flex flex-col gap-10">
                <!-- Quản lý đơn hàng  -->
                <div class="flex flex-col gap-2">
                    <div
                        class="flex items-center justify-between bg-indigo-400 px-4 py-2 text-xs font-semibold text-white hover:cursor-pointer hover:bg-indigo-500 sm:text-sm md:text-base lg:text-lg"
                        @click="toggleManagePackage"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-motorcycle"
                            class="select-none text-sm sm:text-base md:text-xl lg:text-2xl"
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
                                :to="createTransportLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-user-plus"
                                />
                                Tạo đơn giao hàng
                            </router-link>
                            <router-link
                                :to="transportStatusLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
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
                        class="flex items-center justify-between bg-indigo-400 px-4 py-2 text-xs font-semibold text-white hover:cursor-pointer hover:bg-indigo-500 sm:text-sm md:text-base lg:text-lg"
                        @click="toggleManageWarehouse"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-warehouse"
                            class="select-none text-sm sm:text-base md:text-xl lg:text-2xl"
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
                                :to="listWarehouseLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon icon="fa-solid fa-cubes" />
                                Danh sách đơn hàng
                            </router-link>
                            <router-link
                                :to="receivedWarehouseLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-truck-fast"
                                />
                                Đơn về từ điểm tập kết
                            </router-link>
                            <router-link
                                :to="sendWarehouseLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-paper-plane"
                                />
                                Đơn đi điểm tập kết
                            </router-link>
                            <router-link
                                :to="createOrderWarehouseLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
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
                        class="flex items-center justify-between bg-indigo-400 px-4 py-2 text-xs font-semibold text-white hover:cursor-pointer hover:bg-indigo-500 sm:text-sm md:text-base lg:text-lg"
                        @click="toggleManageStatistic"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-filter"
                            class="select-none text-sm sm:text-base md:text-xl lg:text-2xl"
                        />
                        <h1 class="select-none">Thống kê giao hàng</h1>
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
                                :to="successStatisticLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-paper-plane"
                                />
                                Giao thành công
                            </router-link>
                            <router-link
                                :to="failStatisticLink"
                                class="select-none rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
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
    props: ["employee_id"],
    data() {
        return {
            isOpenManageSystem: false,
            isOpenManageWarehouse: false,
            isOpenManageStatistic: false,
            isOpenManagePackage: false,
            employee_info: {
                id: null,
                email: "",
                role: "",
                location: "",
                location_id: null,
            },
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
        async getEmployeeInfo() {
            this.employee_info = await this.$store.dispatch(
                "manager/getEmployeeById",
                this.employee_id,
            );
        },
    },
    computed: {
        userEmail() {
            return this.$store.getters.getUserEmail;
        },
        userId() {
            return this.$store.getters.getUserId;
        },
        createTransportLink() {
            return `/transaction/employee/${this.userId}/transport/create`;
        },
        transportStatusLink() {
            return `/transaction/employee/${this.userId}/transport/status`;
        },
        listWarehouseLink() {
            return `/transaction/employee/${this.userId}/warehouse/list`;
        },
        receivedWarehouseLink() {
            return `/transaction/employee/${this.userId}/warehouse/received`;
        },
        sendWarehouseLink() {
            return `/transaction/employee/${this.userId}/warehouse/send`;
        },
        createOrderWarehouseLink() {
            return `/transaction/employee/${this.userId}/warehouse/create`;
        },
        successStatisticLink() {
            return `/transaction/employee/${this.userId}/statistic/success`;
        },
        failStatisticLink() {
            return `/transaction/employee/${this.userId}/statistic/failed`;
        },
    },
    async mounted() {
        await this.getEmployeeInfo();
    },
};
</script>

<style scoped></style>
