<template>
    <main class="flex flex-col xl:flex-row">
        <!-- Side bar  -->
        <div
            class="flex w-full basis-1/4 flex-col gap-4 lg:gap-8 xl:gap-10 bg-orange-100 p-10 pt-20 lg:min-h-screen"
        >
            <!-- Giới thiệu thông tin  -->
            <div class="flex flex-col items-center gap-2 rounded p-4">
                <h1
                    class="text-sm font-bold sm:text-base md:text-lg lg:text-xl"
                >
                    Trưởng điểm tập kết
                </h1>
                <img
                    src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    alt="user logo"
                    class="h-14 w-14 rounded-full"
                />

                <p class="text-xs md:text-sm lg:text-base">{{ userEmail }}</p>

                <p class="text-xs md:text-sm lg:text-base">ID: {{ userId }}</p>

                <p class="text-xs md:text-sm lg:text-base">
                    {{ leaderInfo.location }}
                </p>
            </div>

            <!-- List các danh mục  -->
            <div class="flex flex-col gap-4 lg:gap-8 xl:gap-10">
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
                                :to="createAccountLink"
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-user-plus"
                                />
                                Tạo tài khoản
                            </router-link>
                            <router-link
                                :to="listAccountLink"
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
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
                                :to="statisticSentLink"
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-paper-plane"
                                />
                                Hàng đi
                            </router-link>
                            <router-link
                                :to="statisticReceivedLink"
                                class="select-none text-xs lg:text-sm xl:text-base rounded border-2 border-black px-4 py-2 font-semibold hover:cursor-pointer hover:bg-amber-100"
                            >
                                <font-awesome-icon
                                    icon="fa-solid fa-satellite-dish"
                                />
                                Hàng đến
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
            error: null,
            isOpenManageSystem: false,
            isOpenManageAccount: false,
            isOpenManageStatistic: false,
            leaderInfo: {
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
        toggleManageAccount() {
            this.isOpenManageAccount = !this.isOpenManageAccount;
        },
        toggleManageStatistic() {
            this.isOpenManageStatistic = !this.isOpenManageStatistic;
        },
        async getLeaderInfo(account_id) {
            try {
                this.leaderInfo = await this.$store.dispatch(
                    "manager/getEmployeeById",
                    account_id,
                );
            } catch (error) {
                console.log(error);
                this.error = error.message;
            }
        },
    },
    computed: {
        userEmail() {
            return this.$store.getters.getUserEmail;
        },
        userId() {
            return this.$store.getters.getUserId;
        },
        createAccountLink() {
            return "/aggregation/leader/" + this.leader_id + "/account/create";
        },
        listAccountLink() {
            return "/aggregation/leader/" + this.leader_id + "/account/list";
        },
        statisticSentLink() {
            return "/aggregation/leader/" + this.leader_id + "/statistic/sent";
        },
        statisticReceivedLink() {
            return (
                "/aggregation/leader/" + this.leader_id + "/statistic/received"
            );
        },
    },
    mounted() {
        this.getLeaderInfo(this.leader_id);
    },
};
</script>

<style scoped></style>
