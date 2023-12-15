<template>
    <div class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex items-center">
        <!-- list danh sách điểm giao dịch  -->
        <div
            class="flex flex-col justify-start items-start h-full w-full gap-4"
        >
            <table class="w-full">
                <tr class="">
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        STT
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Mã vận đơn
                    </th>
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white"
                    >
                        Hoạt động
                    </th>
                </tr>

                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">1</td>
                    <td class="border-e-2 border-white text-center">
                        DP12345678
                    </td>
                    <td
                        class="border-e-2 border-white text-center hover:underline hover:cursor-pointer hover:text-sky-800"
                    >
                        <router-link to="/customer/6/history/7"
                            >Xem chi tiết</router-link
                        >
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">2</td>
                    <td class="border-e-2 border-white text-center">
                        DP12345678
                    </td>
                    <td
                        class="border-e-2 border-white text-center hover:underline hover:cursor-pointer hover:text-sky-800"
                    >
                        <router-link to="/customer/6/history/7"
                            >Xem chi tiết</router-link
                        >
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">3</td>
                    <td class="border-e-2 border-white text-center">
                        DP12345678
                    </td>
                    <td
                        class="border-e-2 border-white text-center hover:underline hover:cursor-pointer hover:text-sky-800"
                    >
                        <router-link to="/customer/6/history/7"
                            >Xem chi tiết</router-link
                        >
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">4</td>
                    <td class="border-e-2 border-white text-center">
                        DP12345678
                    </td>
                    <td
                        class="border-e-2 border-white text-center hover:underline hover:cursor-pointer hover:text-sky-800"
                    >
                        <router-link to="/customer/6/history/7"
                            >Xem chi tiết</router-link
                        >
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">5</td>
                    <td class="border-e-2 border-white text-center">
                        DP12345678
                    </td>
                    <td
                        class="border-e-2 border-white text-center hover:underline hover:cursor-pointer hover:text-sky-800"
                    >
                        <router-link to="/customer/6/history/7"
                            >Xem chi tiết</router-link
                        >
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">6</td>
                    <td class="border-e-2 border-white text-center">
                        DP12345678
                    </td>
                    <td
                        class="border-e-2 border-white text-center hover:underline hover:cursor-pointer hover:text-sky-800"
                    >
                        <router-link to="/customer/6/history/7"
                            >Xem chi tiết</router-link
                        >
                    </td>
                </tr>
                <tr class="bg-gray-200">
                    <td class="border-e-2 border-white text-center">7</td>
                    <td class="border-e-2 border-white text-center">
                        DP12345678
                    </td>
                    <td
                        class="border-e-2 border-white text-center hover:underline hover:cursor-pointer hover:text-sky-800"
                    >
                        <router-link to="/customer/6/history/7"
                            >Xem chi tiết</router-link
                        >
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
    methods: {},
};
</script>
