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
                            @input="searchByPackageId($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Ngày nhập kho"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @input="searchByTimeArrived($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Nơi đến"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @input="
                                searchByReceiverAddress($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                    <td class="mt-1 border-e-2 border-white p-1 flex items-center justify-center text-rose-600 font-bold italic">
                        <p>{{ packageStatuses.length }} đơn hàng</p>
                    </td>
                </tr>

                <!-- Hiển thị data  -->
                <tr
                    class="bg-gray-200"
                    v-for="(status, index) in packageStatuses"
                    :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'"
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
            <form class="flex flex-col gap-2">
                <div class="grid grid-cols-3 items-center justify-start">
                    <label for="action" class="text-start font-semibold"
                        >Trạng thái:</label
                    >
                    <select
                        name=""
                        id="action"
                        class="col-span-2 rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.nextStatus"
                    >
                        <option value="Chuyển đến điểm tập kết">
                            Chuyển đến điểm tập kết
                        </option>
                        <option value="Giao hàng">Giao hàng</option>
                    </select>
                </div>
                <div
                    class="grid grid-cols-3 items-center justify-start"
                    v-if="
                        updatePackageStatus.nextStatus ===
                        'Chuyển đến điểm tập kết'
                    "
                >
                    <label for="aggregation" class="text-start font-semibold"
                        >Điểm tập kết:</label
                    >
                    <select
                        name=""
                        id="aggregation"
                        class="col-span-2 rounded border border-black px-2 py-1"
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
export default {
    props: ["employee_id"],
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
                        status: this.updatePackageStatus.nextStatus,
                        package_id: this.updatePackageStatus.package_id,
                        location_id: this.location_id,
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
            this.isLoading = false;
        },
        resetFormUpdateStatus() {
            this.updatePackageStatus = {
                nextStatus: "Chuyển đến điểm tập kết",
                aggregation: "Điểm tập kết",
                package_id: null,
                location_id: null,
            };
            this.isUpdateStatus = false;
            this.isLoading = false;
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
        //Phần search
        removeAccents(str) {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
        },
        async searchByPackageId(string) {
            if (string === "") {
                this.getPackageStatusByLocationId(this.location_id);
            } else {
                await this.getPackageStatusByLocationId(this.location_id);
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.package_id.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByTimeArrived(string) {
            if (string === "") {
                this.getPackageStatusByLocationId(this.location_id);
            } else {
                await this.getPackageStatusByLocationId(this.location_id);
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.createdAt.toLowerCase()).includes(
                        this.removeAccents(string.toLowerCase()),
                    ),
                );
            }
        },
        async searchByReceiverAddress(string) {
            if (string === "") {
                this.getPackageStatusByLocationId(this.location_id);
            } else {
                await this.getPackageStatusByLocationId(this.location_id);
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.destination.toLowerCase()).includes(
                        this.removeAccents(string.toLowerCase()),
                    ),
                );
            }
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
