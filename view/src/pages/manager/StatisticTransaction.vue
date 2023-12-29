<template>
    <div class="mt-0 flex w-full basis-3/4 items-center bg-gray-100 xl:mt-20">
        <!-- list danh sách điểm giao dịch  -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <table class="w-full text-xs xl:text-sm">
                <tr class="">
                    <th
                        class="select-none border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        ID
                    </th>
                    <th
                        class="select-none border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Điểm giao dịch
                    </th>
                    <th
                        class="select-none border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
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
                </tr>

                <!-- phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="ID điểm giao dịch"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="
                                searchBytransactionId($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Tên điểm giao dịch "
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByName($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Số lượng đơn hàng"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="
                                searchByPackageQuantity($event.target.value)
                            "
                        />
                    </td>
                </tr>

                <tr
                    v-for="(transaction, index) in transactions"
                    :key="transaction.id"
                    class="bg-gray-200"
                    :class="index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200'"
                >
                    <td class="border-e-2 border-white text-center">
                        {{ transaction.id }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ transaction.address }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ transaction.package_quantity }}
                    </td>
                </tr>
            </table>
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
            totalPackageFilter: "default",
            transactions: [],
            error: null,
            isLoading: false,
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
        async toggleTotalPackageFilter() {
            this.idFilter = "default";
            this.totalInventoryFilter = "default";
            if (this.totalPackageFilter === "default") {
                this.totalPackageFilter = "increase";
                await this.getTransactions();
                this.transactions.sort((a, b) => {
                    return a.package_quantity - b.package_quantity;
                });
            } else if (this.totalPackageFilter === "increase") {
                this.totalPackageFilter = "decrease";
                await this.getTransactions();
                this.transactions.sort((a, b) => {
                    return b.package_quantity - a.package_quantity;
                });
            } else {
                this.totalPackageFilter = "default";
                await this.getTransactions();
            }
        },
        async getTransactions() {
            try {
                this.isLoading = true;
                this.transactions = await this.$store.dispatch(
                    "transaction/getPackageStatistics",
                );
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
        async searchBytransactionId(string) {
            if (string === "") {
                this.getTransactions();
            } else {
                await this.getTransactions();
                this.transactions = this.transactions.filter((transaction) =>
                    this.removeAccents(String(transaction.id)).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByName(string) {
            if (string === "") {
                this.getTransactions();
            } else {
                await this.getTransactions();
                this.transactions = this.transactions.filter((transaction) =>
                    this.removeAccents(
                        transaction.address.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
        async searchByPackageQuantity(string) {
            if (string === "") {
                this.getTransactions();
            } else {
                await this.getTransactions();
                this.transactions = this.transactions.filter((transaction) =>
                    this.removeAccents(
                        transaction.package_quantity.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
    },
    mounted() {
        this.getTransactions();
    },
};
</script>
