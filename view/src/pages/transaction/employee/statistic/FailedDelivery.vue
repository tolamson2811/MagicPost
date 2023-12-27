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
                    </th>
                    <th
                        class="w-3/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Địa chỉ nhận
                    </th>
                    <th
                        class="w-1/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Họ tên người nhận
                    </th>
                    <th
                        class="w-1/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        SĐT người nhận
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thời gian giao hàng
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Lí do
                    </th>
                    <th
                        class="w-1/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Chi tiết đơn hàng
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
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Thời gian giao hàng"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @input="searchByTimeDelivery($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Lí do"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @input="searchByFailReason($event.target.value)"
                        />
                    </td>
                    <td
                        class="mt-1 flex items-center justify-center border-e-2 border-white p-1 font-bold italic text-rose-600"
                    >
                        <p>{{ packages.length }} lượt</p>
                    </td>
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
                        {{ order.time_delivery }}
                    </td>

                    <td class="border-e-2 border-white py-1 text-center">
                        {{ order.fail_reason }}
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
        </div>
    </div>
</template>

<script>
export default {
    props: ["employee_id"],
    data() {
        return {
            location_id: null,
            packages: [],
        };
    },
    methods: {
        async getLocationId() {
            const res = await this.$store.dispatch(
                "manager/getEmployeeById",
                this.employee_id,
            );

            this.location_id = res.location_id;
        },
        async getFailedDeliveredPackage() {
            this.packages = await this.$store.dispatch(
                "package/getFailedDeliveryPackage",
                this.location_id,
            );
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
                this.getFailedDeliveredPackage();
            } else {
                await this.getFailedDeliveredPackage();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(order.package_id.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByReceiverAddress(string) {
            if (string === "") {
                this.getFailedDeliveredPackage();
            } else {
                await this.getFailedDeliveredPackage();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(
                        order.receiver_address.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
        async searchByReceiverName(string) {
            if (string === "") {
                this.getFailedDeliveredPackage();
            } else {
                await this.getFailedDeliveredPackage();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(
                        order.receiver_name.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
        async searchByReceiverPhone(string) {
            if (string === "") {
                this.getFailedDeliveredPackage();
            } else {
                await this.getFailedDeliveredPackage();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(order.receiver_phone).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByTimeDelivery(string) {
            if (string === "") {
                this.getFailedDeliveredPackage();
            } else {
                await this.getFailedDeliveredPackage();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(
                        order.time_delivery.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
        async searchByFailReason(string) {
            if (string === "") {
                this.getFailedDeliveredPackage();
            } else {
                await this.getFailedDeliveredPackage();
                this.packages = this.packages.filter((order) =>
                    this.removeAccents(
                        order.fail_reason.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
    },
    async mounted() {
        await this.getLocationId();
        this.getFailedDeliveredPackage();
    },
};
</script>

<style scoped></style>
