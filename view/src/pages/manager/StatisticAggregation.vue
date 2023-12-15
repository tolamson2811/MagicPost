<template>
    <div class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex items-center">
        <!-- list danh sách điểm giao dịch  -->
        <div
            class="flex flex-col gap-4 justify-start items-start h-full w-full"
        >
            <table class="w-full">
                <tr class="">
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
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
                        Điểm tập kết
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Tổng đơn hàng
                        <font-awesome-icon
                            icon="fa-solid fa-arrows-up-down"
                            class="hover:cursor-pointer"
                            v-if="totalPackageFilter === 'default'"
                            @click="toggleTotalPackageFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-up"
                            class="hover:cursor-pointer"
                            v-if="totalPackageFilter === 'increase'"
                            @click="toggleTotalPackageFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-down"
                            class="hover:cursor-pointer"
                            v-if="totalPackageFilter === 'decrease'"
                            @click="toggleTotalPackageFilter()"
                        />
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Hàng tồn kho
                        <font-awesome-icon
                            icon="fa-solid fa-arrows-up-down"
                            class="hover:cursor-pointer"
                            v-if="totalInventoryFilter === 'default'"
                            @click="toggleTotalInventoryFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-up"
                            class="hover:cursor-pointer"
                            v-if="totalInventoryFilter === 'increase'"
                            @click="toggleTotalInventoryFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-down"
                            class="hover:cursor-pointer"
                            v-if="totalInventoryFilter === 'decrease'"
                            @click="toggleTotalInventoryFilter()"
                        />
                    </th>
                </tr>

                <!-- phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="ID điểm tập kết"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Tên điểm tập kết "
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Số lượng đơn hàng"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Số lượng đơn hàng"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                </tr>

                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">140 000</td>
                    <td class="border-e-2 border-white text-center">20 000</td>
                </tr>
            </table>

            <div class="grid grid-cols-12 gap-2 w-full px-1">
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    <font-awesome-icon icon="fa-solid fa-chevron-left" />
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    1
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    2
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    3
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    4
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    5
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    6
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    7
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    8
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    9
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
                >
                    10
                </button>
                <button
                    class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"
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
            totalPackageFilter: "default",
            totalInventoryFilter: "default",
        };
    },
    methods: {
        toggleIdFilter() {
            this.totalInventoryFilter = "default";
            this.totalPackageFilter = "default";
            if (this.idFilter === "default") {
                this.idFilter = "increase";
            } else if (this.idFilter === "increase") {
                this.idFilter = "decrease";
            } else {
                this.idFilter = "default";
            }
        },
        toggleTotalPackageFilter() {
            this.idFilter = "default";
            this.totalInventoryFilter = "default";
            if (this.totalPackageFilter === "default") {
                this.totalPackageFilter = "increase";
            } else if (this.totalPackageFilter === "increase") {
                this.totalPackageFilter = "decrease";
            } else {
                this.totalPackageFilter = "default";
            }
        },
        toggleTotalInventoryFilter() {
            this.idFilter = "default";
            this.totalPackageFilter = "default";
            if (this.totalInventoryFilter === "default") {
                this.totalInventoryFilter = "increase";
            } else if (this.totalInventoryFilter === "increase") {
                this.totalInventoryFilter = "decrease";
            } else {
                this.totalInventoryFilter = "default";
            }
        },
    },
};
</script>
