<template>
    <div class="mt-16 flex w-full basis-3/4 items-center bg-gray-100 lg:mt-20">
        <!-- list danh sách tài khoản  -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <table class="w-full text-sm">
                <tr>
                    <th
                        class="w-1/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
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
                        class="w-3/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Địa chỉ nhận
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Họ tên người nhận
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        SĐT người nhận
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Cập nhật
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
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
                            @input="searchById($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Địa chỉ nhận"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @input="
                                searchByReceiverAddress($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Họ và tên người nhận"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @input="searchByReceiverName($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="SĐT người nhận"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @input="searchByReceiverPhone($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                </tr>

                <tr
                    v-for="(order, index) in packages"
                    :key="order.package_id"
                    class="bg-gray-200"
                    :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'"
                >
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ order.package_id }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ order.receiver_address }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ order.receiver_name }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ order.receiver_phone }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        <button
                            class="rounded-lg bg-rose-500 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-rose-600"
                            @click="handleClickUpdateStatus(order)"
                        >
                            Cập nhật
                        </button>
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        <router-link
                            class="rounded-lg bg-indigo-400 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-indigo-500"
                            :to="'/package/detail/' + order.package_id"
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
            :show="!!isUpdatePackageStatus"
            title="Cập nhật trạng thái giao hàng"
            @exit="resetFormUpdateStatus"
            @close="handleConfirmUpdatePackageStatus"
        >
            <form class="flex flex-col gap-2">
                <div class="grid grid-cols-3 items-center justify-start gap-2">
                    <label for="action" class="text-start font-semibold"
                        >Trạng thái:</label
                    >
                    <select
                        name=""
                        id="action"
                        class="col-span-2 rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.status"
                    >
                        <option value="Giao thành công">Giao thành công</option>
                        <option value="Giao thất bại">Giao thất bại</option>
                    </select>
                </div>

                <div
                    class="grid grid-cols-3 items-center justify-start gap-2"
                    v-if="updatePackageStatus.status === 'Giao thất bại'"
                >
                    <label for="aggregation" class="text-start font-semibold"
                        >Lí do:</label
                    >
                    <input
                        type="text"
                        class="col-span-2 rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.fail_reason"
                    />
                </div>
            </form>
        </update-status>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="error = null"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <base-spinner v-if="isLoading"></base-spinner>
    </div>
</template>

<script>
export default {
    props: ["employee_id"],
    data() {
        return {
            idFilter: "default",
            packages: [],
            location_id: null,
            error: null,
            isLoading: false,
            isUpdatePackageStatus: false,
            updatePackageStatus: {
                package_id: null,
                status: "Giao thành công",
                fail_reason: null,
                shipper_id: null,
                location_id: null,
            },
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
        async getPackages() {
            try {
                this.packages = await this.$store.dispatch(
                    "package/getDeliveringPackage",
                    this.location_id,
                );

                console.log(this.packages);
            } catch (error) {
                this.error = error.message;
            }
        },
        async getLocationId() {
            try {
                const res = await this.$store.dispatch(
                    "manager/getEmployeeById",
                    this.employee_id,
                );

                this.location_id = res.location_id;
            } catch (error) {
                this.error = error.message;
            }
        },
        //Phần cập nhật trạng thái đơn hàng
        handleClickUpdateStatus(order) {
            this.updatePackageStatus.package_id = order.package_id;
            this.updatePackageStatus.shipper_id = this.employee_id;
            this.isUpdatePackageStatus = true;
        },
        resetFormUpdateStatus() {
            this.updatePackageStatus = {
                package_id: null,
                status: "Giao thành công",
                fail_reason: null,
                shipper_id: null,
                location_id: null,
            };
            this.isUpdatePackageStatus = false;
        },
        async handleConfirmUpdatePackageStatus() {
            if (this.updatePackageStatus.status === "Giao thất bại") {
                if (this.updatePackageStatus.fail_reason === null) {
                    alert("Vui lòng nhập lí do giao thất bại!");
                    return;
                }
            }
            this.updatePackageStatus.location_id = this.location_id;

            try {
                this.isLoading = true;
                await this.$store.dispatch(
                    "package/addPackageStatus",
                    this.updatePackageStatus,
                );
                this.resetFormUpdateStatus();
                this.isLoading = false;
                this.$notify({
                    title: "Cập nhật đơn hàng thành công!",
                    type: "success",
                });
                this.getPackages();
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        //Phần filter
        // Xóa bỏ dấu tiếng Việt
        removeAccents(str) {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
        },
        async searchById(string) {
            if (string === "") {
                this.getPackages();
            } else {
                await this.getPackages();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(order.package_id.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByReceiverAddress(string) {
            if (string === "") {
                this.getPackages();
            } else {
                await this.getPackages();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(order.receiver_address).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByReceiverName(string) {
            if (string === "") {
                this.getPackages();
            } else {
                await this.getPackages();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(order.receiver_name).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByReceiverPhone(string) {
            if (string === "") {
                this.getPackages();
            } else {
                await this.getPackages();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(order.receiver_phone).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
    },
    async mounted() {
        await this.getLocationId();
        this.getPackages();
    },
};
</script>

<style scoped></style>
