<template>
    <div class="mt-0 flex w-full basis-3/4 items-center bg-gray-100 xl:mt-20">
        <!-- list danh sách tài khoản  -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <table class="w-full text-xs xl:text-sm">
                <tr class="">
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        ID
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Email
                    </th>
                    <th
                        class="border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Xóa
                    </th>
                </tr>

                <!-- Phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="ID tài khoản"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchById($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="email"
                            placeholder="Email"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByEmail($event.target.value)"
                        />
                    </td>
                    <td
                        class="mt-1 flex items-center justify-center border-e-2 border-white p-1 font-bold italic text-rose-600"
                    >
                        <p>{{ employees.length }} tài khoản</p>
                    </td>
                </tr>

                <!-- Hiển thị data  -->
                <tr
                    v-for="(employee, index) in employees"
                    :key="employee.id"
                    class="bg-gray-200"
                    :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'"
                >
                    <td class="border-e-2 border-white text-center">
                        {{ employee.id }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ employee.email }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
                            @click="clickDeleteEmployee(employee.id)"
                        />
                    </td>
                </tr>
            </table>
        </div>
        <base-dialog
            :show="!!clickDelete.value"
            title="Xác nhận xóa tài khoản"
            @close="confirmDelete(clickDelete.id)"
        >
            <p>Sau khi xóa, tài khoản không thể khôi phục!</p>
        </base-dialog>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="confirmError"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <base-spinner v-if="isLoading"></base-spinner>
    </div>
</template>

<script>
export default {
    props: ["leader_id"],
    data() {
        return {
            isLoading: false,
            error: null,
            idFilter: "default",
            employees: [],
            roleFilter: "Vai trò",
            clickDelete: {
                value: false,
                id: null,
            },
            location_id: null,
        };
    },
    methods: {
        toggleIdFilter() {
            if (this.idFilter === "default") {
                this.idFilter = "increase";
                this.employees.sort((a, b) => a.id - b.id);
            } else if (this.idFilter === "increase") {
                this.idFilter = "decrease";
                this.employees.sort((a, b) => b.id - a.id);
            } else {
                this.idFilter = "default";
                this.getEmployees({
                    location_id: this.location_id,
                });
            }
        },
        // Xóa bỏ dấu tiếng Việt
        removeAccents(str) {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
        },
        async searchByEmail(string) {
            if (string === "") {
                this.getEmployees({
                    location_id: this.location_id,
                });
            } else {
                await this.getEmployees({
                    location_id: this.location_id,
                });
                this.employees = this.employees.filter((employee) =>
                    this.removeAccents(employee.email.toLowerCase()).includes(
                        this.removeAccents(string.toLowerCase()),
                    ),
                );
            }
        },
        async searchById(string) {
            if (string === "") {
                this.getEmployees({
                    location_id: this.location_id,
                });
            } else {
                await this.getEmployees({
                    location_id: this.location_id,
                });
                this.employees = this.employees.filter((employee) =>
                    employee.id.toString().includes(string),
                );
            }
        },
        async getEmployees(payload) {
            try {
                this.isLoading = true;
                const result = await this.$store.dispatch(
                    "transaction/getAllTransactionEmployees",
                    payload,
                );

                this.employees = result.transaction_employee;
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        clickDeleteEmployee(id) {
            this.clickDelete = {
                value: true,
                id: id,
            };
        },
        async confirmDelete(id) {
            try {
                this.isLoading = true;
                await this.$store.dispatch(
                    "transaction/deleteTransactionEmployee",
                    id,
                );
                this.clickDelete = {
                    value: false,
                    id: null,
                };
                this.isLoading = false;
                this.$notify({
                    title: "Xóa tài khoản thành công!",
                });
                this.getEmployees({
                    location_id: this.location_id,
                });
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        confirmError() {
            this.error = null;
            this.clickDelete = {
                value: false,
                id: null,
            };
        },
        async getLocationId() {
            const res = await this.$store.dispatch(
                "manager/getEmployeeById",
                this.leader_id,
            );
            this.location_id = res.location_id;
        },
        confirmError() {
            this.error = null;
        },
    },
    async mounted() {
        await this.getLocationId();
        await this.getEmployees({
            location_id: this.location_id,
        });
    },
};
</script>

<style scoped></style>
