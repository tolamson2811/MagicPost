<template>
    <div class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex items-center">
        <!-- tìm kiếm  -->
        <div class="basis-1/4 w-full h-full p-4 flex flex-col gap-4">
            <div>
                <label for="id">Tìm kiếm theo ID</label>
                <input
                    type="number"
                    id="id"
                    placeholder="ID tài khoản"
                    class="rounded px-2 py-1 outline-green-300 border border-black w-full"
                />
            </div>

            <div>
                <label for="email">Tìm kiếm theo Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Email tài khoản"
                    class="rounded px-2 py-1 outline-green-300 border border-black w-full"
                />
            </div>

            <div>
                <label for="role">Tìm kiếm theo vai trò</label>
                <input
                    type="text"
                    id="role"
                    placeholder="Vai trò"
                    class="rounded px-2 py-1 outline-green-300 border border-black w-full"
                />
            </div>

            <div class="flex flex-col gap-2">
                <label>Tìm kiếm theo địa điểm làm việc</label>
                <select
                    name=""
                    id=""
                    class="rounded px-2 py-1 outline-green-300 border border-black w-full"
                >
                    <option value="Tỉnh/Thành phố">Tỉnh/Thành phố</option>
                </select>
                <select
                    name=""
                    id=""
                    class="rounded px-2 py-1 outline-green-300 border border-black w-full"
                >
                    <option value="Quận/Huyện">Quận/Huyện</option>
                </select>
            </div>

            <button
                class="bg-green-300 py-2 rounded-lg font-bold lg:text-base md:text-sm text-xs hover:cursor-pointer hover:bg-green-400"
            >
                Tìm kiếm
            </button>
        </div>

        <!-- list danh sách tài khoản  -->
        <div class="basis-3/4 flex flex-col justify-start items-start h-full w-full gap-4">
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

            <div class=" grid grid-cols-12 gap-2 w-full px-1">
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">1</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">2</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">3</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">4</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">5</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">6</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">7</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">8</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">9</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400">10</button>
                <button class="px-4 py-1 rounded bg-green-300 hover:cursor-pointer hover:bg-green-400"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
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
        }
    }
};
</script>

<style scoped></style>
