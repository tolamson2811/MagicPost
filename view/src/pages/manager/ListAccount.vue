<template>
    <div class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex items-center">
        <!-- list danh sách tài khoản  -->
        <div
            class="flex flex-col justify-start items-start h-full w-full gap-4"
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
                        Email
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Password
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Vai trò
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Địa điểm làm việc
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Xóa
                    </th>
                </tr>

                <!-- Phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="ID điểm giao dịch"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="email"
                            placeholder="Email"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Password"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <select
                            name=""
                            id=""
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        >
                            <option value="Trưởng điểm giao dịch">
                                Trưởng điểm giao dịch
                            </option>
                            <option value="Trưởng điểm tập kết">
                                Trưởng điểm tập kết
                            </option>
                        </select>
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Địa điểm làm việc"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white"></td>
                </tr>

                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        test@gmail.com
                    </td>
                    <td class="border-e-2 border-white text-center">
                        abc123456
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Trưởng điểm giao dịch
                    </td>
                    <td class="border-e-2 border-white text-center">
                        Cầu Giấy, Hà Nội
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                        />
                    </td>
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
