<template>
    <div class="mt-16 flex w-full basis-3/4 items-center bg-gray-100 lg:mt-20">
        <!-- list danh sách hàng hóa  -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <table class="w-full text-sm">
                <tr class="">
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        ID
                        <font-awesome-icon
                            icon="fa-solid fa-arrows-up-down"
                            class="hover:cursor-pointer"
                            v-if="idFilter === 'default'"
                            @click="toggleIdFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-up"
                            class="hover:cursor-pointer"
                            v-if="idFilter === 'increase'"
                            @click="toggleIdFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-down"
                            class="hover:cursor-pointer"
                            v-if="idFilter === 'decrease'"
                            @click="toggleIdFilter()"
                        />
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Ngày nhập kho
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Nơi đến
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Cập nhật đơn hàng
                    </th>

                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Xem chi tiết
                    </th>
                </tr>

                <!-- Phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="ID đơn hàng"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Ngày nhập kho"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                </tr>

                <!-- Hiển thị data  -->
                <tr
                    class="bg-gray-200"
                    v-for="status in packageStatuses"
                    :key="status.id"
                >
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ status.package_id }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ status.createdAt }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ status.destination }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        <button
                            class="rounded-lg bg-rose-500 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-rose-600"
                            @click="clickUpdateStatus(status.package_id)"
                        >
                            Cập nhật
                        </button>
                    </td>

                    <td class="border-e-2 border-white py-1 text-center">
                        <router-link
                            class="rounded-lg bg-indigo-400 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-indigo-500"
                            :to="'/package/detail/' + status.package_id"
                        >
                            Xem chi tiết
                        </router-link>
                    </td>
                </tr>
            </table>

            <!-- Phân trang  -->
            <!-- <div class="grid grid-cols-12 gap-2 w-full px-1">
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    <font-awesome-icon icon="fa-solid fa-chevron-left" />
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    1
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    2
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    3
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    4
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    5
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    6
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    7
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    8
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    9
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    10
                </button>
                <button
                    class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
                >
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </button>
            </div> -->
        </div>
        <update-status
            :show="!!isUpdateStatus"
            title="Cập nhật đơn hàng"
            @close="handleUpdateStatus"
            @exit="resetFormUpdateStatus"
        >
            <form action="" class="flex flex-col gap-2">
                <div class="grid grid-cols-2 items-center">
                    <label for="action" class="font-semibold"
                        >Trạng thái kế tiếp:</label
                    >
                    <select
                        name=""
                        id="action"
                        class="rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.nextStatus"
                    >
                        <option value="Chuyển đến điểm tập kết">
                            Chuyển đến điểm tập kết
                        </option>
                        <option value="Giao hàng">Giao hàng</option>
                    </select>
                </div>
                <div
                    class="grid grid-cols-2 items-center"
                    v-if="
                        updatePackageStatus.nextStatus ===
                        'Chuyển đến điểm tập kết'
                    "
                >
                    <label for="aggregation" class="font-semibold"
                        >Điểm tập kết:</label
                    >
                    <select
                        name=""
                        id="aggregation"
                        class="rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.aggregation"
                    >
                        <option value="Điểm tập kết">Điểm tập kết</option>
                        <option
                            v-for="aggregation in aggregations"
                            :key="aggregation.code"
                            :value="aggregation.name"
                        >
                            {{ aggregation.name }}
                        </option>
                    </select>
                </div>
            </form>
        </update-status>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="error = null"
        >
            <p>{{ error }}</p>
        </base-dialog>
    </div>
</template>

<script>
import UpdateStatus from "../../../../components/packages/UpdateStatus.vue";
export default {
    props: ["employee_id"],
    components: {
        UpdateStatus,
    },
    data() {
        return {
            idFilter: "default",
            updatePackageStatus: {
                nextStatus: "Chuyển đến điểm tập kết",
                aggregation: "Điểm tập kết",
                package_id: null,
                location_id: null,
            },
            aggregations: [],
            isUpdateStatus: false,
            location_id: null,
            packageStatuses: [],
            error: null,
        };
    },
    methods: {
        toggleIdFilter() {
            if (this.idFilter === "default") {
                this.idFilter = "increase";
            } else if (this.idFilter === "increase") {
                this.idFilter = "decrease";
            } else {
                this.idFilter = "default";
            }
        },
        async setAggregations() {
            await this.$store.dispatch("address/getProvinces");
            this.aggregations = this.$store.getters["address/getProvinces"];
        },
        async clickUpdateStatus(package_id) {
            this.isUpdateStatus = true;
            this.updatePackageStatus.package_id = package_id;
        },
        async handleUpdateStatus() {
            try {
                this.isLoading = true;
                let formData = {};
                if (
                    this.updatePackageStatus.nextStatus ===
                    "Chuyển đến điểm tập kết"
                ) {
                    if (
                        this.updatePackageStatus.aggregation === "Điểm tập kết"
                    ) {
                        alert("Vui lòng chọn điểm tập kết");
                        return;
                    }
                    this.updatePackageStatus.location_id =
                        await this.getLocationIdOfAggregationByName(
                            this.updatePackageStatus.aggregation,
                        );
                    formData = {
                        package_id: this.updatePackageStatus.package_id,
                        location_id: this.updatePackageStatus.location_id,
                        status: this.updatePackageStatus.nextStatus,
                        next_destination: this.updatePackageStatus.aggregation,
                    };
                } else {
                    formData = {
                        package_status: this.updatePackageStatus.nextStatus,
                        package_id: this.updatePackageStatus.package_id,
                        location_id: this.updatePackageStatus.location_id,
                    };
                }
                await this.$store.dispatch(
                    "package/addPackageStatus",
                    formData,
                );
                this.resetFormUpdateStatus();
                this.isLoading = false;
                this.$notify({
                    title: "Cập nhật đơn hàng thành công!",
                    type: "success",
                });
                this.getPackageStatusByLocationId(this.location_id);
            } catch (error) {
                this.error = error.message;
            }
        },
        resetFormUpdateStatus() {
            this.updatePackageStatus = {
                nextStatus: "Chuyển đến điểm tập kết",
                aggregation: "Điểm tập kết",
                package_id: null,
                location_id: null,
            };
            this.isUpdateStatus = false;
        },
        async getLocationId() {
            const res = await this.$store.dispatch(
                "manager/getEmployeeById",
                this.employee_id,
            );

            this.location_id = res.location_id;
        },
        async getLocationIdOfAggregationByName(name) {
            try {
                const res = await this.$store.dispatch(
                    "aggregation/getLocationIdByName",
                    name,
                );

                return res;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async getPackageStatusByLocationId(location_id) {
            const res = await this.$store.dispatch(
                "package/getPackageStatusByLocationId",
                location_id,
            );
            this.packageStatuses = res;
        },
    },
    async mounted() {
        await this.setAggregations();
        await this.getLocationId();
        await this.getPackageStatusByLocationId(this.location_id);
    },
};
</script>

<style scoped></style>
