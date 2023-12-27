<template>
    <div class="mt-16 flex w-full items-center bg-gray-100 lg:mt-20">
        <div
            class="mt-4 flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <h1 class="mx-auto text-lg font-bold text-sky-900">
                Thông tin đơn hàng
            </h1>
            <table class="w-full">
                <tr class="grid grid-cols-2">
                    <th
                        class="w-full border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thông tin gói hàng
                    </th>
                    <th
                        class="w-full border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thông tin chi tiết
                    </th>
                </tr>

                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Mã vận đơn
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.package_id }}</h1>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Loại hàng
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.type }}</h1>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Ngày tạo đơn
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <p>{{ package_detail.createdAt }}</p>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Cước phí
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.price }}</h1>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Khối lượng
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.weight }}kg</h1>
                    </td>
                </tr>
            </table>
            <table class="w-full">
                <tr class="grid grid-cols-2">
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thông tin người gửi
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thông tin chi tiết
                    </th>
                </tr>

                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Họ và tên
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.sender_name }}</h1>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">Địa chỉ</td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.sender_address }}</h1>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Số điện thoại
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.sender_phone }}</h1>
                    </td>
                </tr>
            </table>
            <table class="w-full">
                <tr class="grid grid-cols-2">
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thông tin người nhận
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thông tin chi tiết
                    </th>
                </tr>

                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Họ và tên
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.receiver_name }}</h1>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">Địa chỉ</td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.receiver_address }}</h1>
                    </td>
                </tr>
                <tr class="grid grid-cols-2 bg-gray-200">
                    <td class="border-e-2 border-white text-center">
                        Số điện thoại
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <h1>{{ package_detail.receiver_phone }}</h1>
                    </td>
                </tr>
            </table>
            <h1 class="mx-auto text-lg font-bold text-sky-900">
                Trạng thái giao hàng
            </h1>
            <table class="w-full">
                <tr class="grid grid-cols-5">
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Lượt
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Trạng thái
                    </th>

                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Thời gian giao
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        ID giao dịch viên
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        *Lí do giao thất bại
                    </th>
                </tr>

                <tr
                    v-for="(status, index) in package_status"
                    :key="index"
                    class="grid grid-cols-5 bg-gray-200"
                >
                    <td class="border-e-2 border-white text-center">
                        {{ index + 1 }}
                    </td>
                    <td
                        class="border-e-2 border-white text-center"
                        :class="
                            status.status == 'Giao thành công'
                                ? 'font-bold text-red-500'
                                : 'text-black'
                        "
                    >
                        {{ status.status }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ status.time_delivery }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ status.shipper_id }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ status.fail_reason }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    props: ["package_id"],
    data() {
        return {
            package_detail: {},
            error: null,
            package_status: [],
        };
    },
    methods: {
        async getPackageDetail() {
            try {
                this.package_detail = await this.$store.dispatch(
                    "package/getPackageDetail",
                    this.package_id,
                );
            } catch (error) {
                console.log(error);
                this.error = error.message;
            }
        },
        async getDeliveryStatus() {
            this.package_status = await this.$store.dispatch(
                "package/getDeliveryStatus",
                this.package_id,
            );
        },
    },
    mounted() {
        this.getPackageDetail();
        this.getDeliveryStatus();
    },
};
</script>
