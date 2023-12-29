<template>
    <div class="mt-0 flex w-full basis-3/4 items-center bg-gray-100 xl:mt-20">
        <!-- list danh sách hàng hóa  -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <table class="w-full text-xs xl:text-sm">
                <tr class="">
                    <th
                        class="w-1/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        ID
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Ngày trung chuyển
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Nguồn gốc
                    </th>
                    <th
                        class="w-3/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Địa chỉ người nhận
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Xác nhận nhập kho
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
                            @keyup.enter="searchByPackageId($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Ngày trung chuyển"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByTimeArrived($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Nguồn gốc"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByTransaction($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Địa chỉ người nhận"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="
                                searchByReceiverAddress($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                    <td
                        class="mt-1 flex items-center justify-center border-e-2 border-white p-1 font-bold italic text-rose-600"
                    >
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
                    <td class="border-e-2 border-white py-2 text-center">
                        {{ status.package_id }}
                    </td>
                    <td class="border-e-2 border-white py-2 text-center">
                        {{ status.arrived_time }}
                    </td>
                    <td class="border-e-2 border-white py-2 text-center">
                        {{ status.from }}
                    </td>
                    <td class="border-e-2 border-white py-2 text-center">
                        {{ status.receiver_address }}
                    </td>
                    <td class="border-e-2 border-white py-2 text-center">
                        <button
                            class="rounded-lg bg-rose-500 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-rose-600"
                            @click="clickConfirmImport(status.package_id)"
                        >
                            Xác nhận
                        </button>
                    </td>

                    <td class="border-e-2 border-white py-2 text-center">
                        <router-link
                            class="rounded-lg bg-indigo-400 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-indigo-500"
                            :to="'/package/detail/' + status.package_id"
                        >
                            Xem chi tiết
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="error = null"
            @exit="error = null"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog
            :show="!!isConfirmImport.value"
            title="Xác nhận nhập kho"
            @exit="
                this.isConfirmImport = {
                    package_id: null,
                    value: false,
                }
            "
            @close="handleConfirmImport"
        >
            <p>
                Khi xác nhận, đơn hàng sẽ thuộc sự quản lý của điểm giao dịch
                này!
            </p>
        </base-dialog>
        <base-spinner v-if="isLoading"></base-spinner>
    </div>
</template>

<script>
export default {
    props: ["employee_id"],
    data() {
        return {
            location_id: null,
            packageStatuses: [],
            error: null,
            isLoading: false,
            isConfirmImport: {
                package_id: null,
                value: false,
            },
        };
    },
    methods: {
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
        async getPackageStatusByLocationId() {
            try {
                this.isLoading = true;
                const res = await this.$store.dispatch(
                    "package/getTransactionWaitingPackage",
                    this.location_id,
                );
                this.packageStatuses = res;
                console.log(this.packageStatuses);
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
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
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.package_id.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByTimeArrived(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.arrived_time).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByTransaction(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.from.toLowerCase()).includes(
                        this.removeAccents(string.toLowerCase()),
                    ),
                );
            }
        },

        async searchByReceiverAddress(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(
                        order.receiver_address.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },

        //Xác nhận nhập kho
        clickConfirmImport(package_id) {
            this.isConfirmImport = {
                package_id: package_id,
                value: true,
            };
        },

        async handleConfirmImport() {
            const formData = {
                package_id: this.isConfirmImport.package_id,
                status: "Đang ở điểm giao dịch",
                location_id: this.location_id,
            };

            try {
                this.isLoading = true;
                await this.$store.dispatch(
                    "package/addPackageStatus",
                    formData,
                );
                this.isLoading = false;
                this.isConfirmImport = {
                    package_id: null,
                    value: false,
                };
                this.$notify({
                    title: "Cập nhật đơn hàng thành công!",
                    type: "success",
                });
                this.getPackageStatusByLocationId();
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
    },
    async mounted() {
        await this.getLocationId();
        await this.getPackageStatusByLocationId();
    },
};
</script>

<style scoped></style>
