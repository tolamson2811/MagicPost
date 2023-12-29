<template>
    <div class="mt-0 flex w-full basis-3/4 items-center bg-gray-100 xl:mt-20">
        <!-- list danh sách điểm giao dịch  -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <table class="w-full text-xs xl:text-sm">
                <tr class="">
                    <th
                        class="w-1/12 select-none border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        ID
                    </th>
                    <th
                        class="w-4/12 select-none border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Điểm tập kết
                    </th>
                    <th
                        class="w-3/12 select-none border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Số lượng nhân viên
                        <font-awesome-icon
                            icon="fa-solid fa-arrows-up-down"
                            class="hover:cursor-pointer"
                            v-if="quantityFilter === 'default'"
                            @click="toggleQuantityFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-up"
                            class="hover:cursor-pointer"
                            v-if="quantityFilter === 'increase'"
                            @click="toggleQuantityFilter()"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-arrow-down"
                            class="hover:cursor-pointer"
                            v-if="quantityFilter === 'decrease'"
                            @click="toggleQuantityFilter()"
                        />
                    </th>
                    <th
                        class="w-4/12 select-none border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Trưởng điểm
                    </th>
                </tr>

                <!-- Phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="ID điểm tập kết"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByAggregationId($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Tên điểm tập kết"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByName($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Số lượng nhân viên"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="
                                searchByEmployeeQuantity($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Email trưởng điểm tập kết"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByLeader($event.target.value)"
                        />
                    </td>
                </tr>

                <tr
                    v-for="(aggregation, index) in aggregations"
                    :key="aggregation.id"
                    class="bg-gray-200"
                    :class="{ 'bg-gray-300': index % 2 === 0 }"
                >
                    <td class="border-e-2 border-white text-center">
                        {{ aggregation.id }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ aggregation.address }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ aggregation.employee_quantity }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ aggregation.leader }}
                    </td>
                </tr>
            </table>
            <p
                class="px-2 text-xs font-bold italic text-rose-500 lg:text-sm xl:text-base"
            >
                {{ aggregations.length }} điểm tập kết
            </p>
        </div>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="error = null"
            @exit="error = null"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <base-spinner v-if="isLoading"></base-spinner>
    </div>
</template>

<script>
export default {
    data() {
        return {
            idFilter: "default",
            quantityFilter: "default",
            aggregations: [],
            error: null,
            isLoading: false,
        };
    },
    methods: {
        toggleIdFilter() {
            this.quantityFilter = "default";
            if (this.idFilter === "default") {
                this.idFilter = "increase";
            } else if (this.idFilter === "increase") {
                this.idFilter = "decrease";
            } else {
                this.idFilter = "default";
            }
        },
        async toggleQuantityFilter() {
            this.idFilter = "default";
            if (this.quantityFilter === "default") {
                this.quantityFilter = "increase";
                await this.getAllAggregations();
                this.aggregations.sort((a, b) => {
                    return a.employee_quantity - b.employee_quantity;
                });
            } else if (this.quantityFilter === "increase") {
                this.quantityFilter = "decrease";
                await this.getAllAggregations();
                this.aggregations.sort((a, b) => {
                    return b.employee_quantity - a.employee_quantity;
                });
            } else {
                this.quantityFilter = "default";
                await this.getAllAggregations();
            }
        },
        async getAllAggregations() {
            try {
                this.isLoading = true;
                this.aggregations = await this.$store.dispatch(
                    "aggregation/getAllAggregations",
                );
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        //Phần search
        // Xóa bỏ dấu tiếng Việt
        removeAccents(str) {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
        },
        async searchByAggregationId(string) {
            if (string === "") {
                this.getAllAggregations();
            } else {
                await this.getAllAggregations();
                this.aggregations = this.aggregations.filter((aggregation) =>
                    this.removeAccents(String(aggregation.id)).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByName(string) {
            if (string === "") {
                this.getAllAggregations();
            } else {
                await this.getAllAggregations();
                this.aggregations = this.aggregations.filter((transaction) =>
                    this.removeAccents(
                        transaction.address.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
        async searchByEmployeeQuantity(string) {
            if (string === "") {
                this.getAllAggregations();
            } else {
                await this.getAllAggregations();
                this.aggregations = this.aggregations.filter((transaction) =>
                    this.removeAccents(
                        transaction.employee_quantity.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
        async searchByLeader(string) {
            if (string === "") {
                this.getAllAggregations();
            } else {
                await this.getAllAggregations();
                this.aggregations = this.aggregations.filter((transaction) =>
                    this.removeAccents(
                        transaction.leader.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
    },
    mounted() {
        this.getAllAggregations();
    },
};
</script>
