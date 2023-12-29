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
                        class="w-3/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Ngày xuất kho
                    </th>
                    <th
                        class="w-6/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Nơi đến
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
                            @keyup.enter="
                                searchByPackageId($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Ngày xuất kho"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="
                                searchByTimeExport($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Nơi đến"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="
                                searchByNextDestination($event.target.value)
                            "
                        />
                    </td>
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
                        {{ status.time_export }}
                    </td>
                    <td class="border-e-2 border-white py-2 text-center">
                        {{ status.next_destination }}
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
    </div>
</template>

<script>
export default {
    props: ["leader_id"],
    data() {
        return {
            location_id: null,
            error: null,
            isLoading: false,
            packageStatuses: [],
        };
    },
    methods: {
        async getLocationId() {
            try {
                const res = await this.$store.dispatch(
                    "manager/getEmployeeById",
                    this.leader_id,
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
                    "package/getTransactionExportPackages",
                    this.location_id,
                );
                this.packageStatuses = res;
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
        async searchByTimeExport(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.time_export.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByNextStatus(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.next_status.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByNextDestination(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(
                        order.next_destination.toString(),
                    ).includes(this.removeAccents(string)),
                );
            }
        },
    },
    async mounted() {
        await this.getLocationId();
        await this.getPackageStatusByLocationId();
    },
};
</script>

<style scoped></style>
