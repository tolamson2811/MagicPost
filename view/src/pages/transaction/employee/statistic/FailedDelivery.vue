<template>
    <div class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex items-center">
        <!-- list danh sách tài khoản  -->
        <div
            class="flex flex-col justify-start items-start h-full w-full gap-4"
        >
            <table class="w-full text-sm">
                <tr class="text-sm">
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white w-1/12"
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
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Địa chỉ nhận
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Họ tên người nhận
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        SĐT người nhận
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Thời gian giao
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Lí do
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Chi tiết đơn hàng
                    </th>
                </tr>

                <!-- Phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300 text-sm">
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="ID đơn hàng"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Địa chỉ nhận"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Họ và tên người nhận"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="SĐT người nhận"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Ngày, giờ giao"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white"></td>
                    <td class="p-1 mt-1 border-e-2 border-white"></td>
                </tr>

                <tr class="bg-gray-200 text-sm">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Dương Quảng Hàm, Quan Hoa, Cầu Giấy, TP. Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Hien Hoang
                    </td>
                    <td class="border-e-2 border-white text-center">
                        0123456789
                    </td>

                    <td class="border-e-2 border-white text-center p-1">
                        8:37PM - 17/12/2023
                    </td>

                    <td class="border-e-2 border-white text-center p-1">
                        Khách hàng không nghe máy
                    </td>

                    <td class="border-e-2 border-white text-center">
                        <button
                            class="px-2 py-1 bg-indigo-400 text-white rounded-lg font-bold hover:cursor-pointer hover:bg-indigo-500"
                        >
                            Xem chi tiết
                        </button>
                    </td>
                </tr>
            </table>

            <div class="grid grid-cols-12 gap-2 w-full px-1">
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            idFilter: "default",
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
    },
};
</script>

<style scoped></style>
