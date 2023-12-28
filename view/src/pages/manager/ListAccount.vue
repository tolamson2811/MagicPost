<template>
    <div class="mt-0 flex w-full basis-3/4 items-center bg-gray-100 xl:mt-20">
        <!-- list danh sách tài khoản  -->
        <div
            class="flex h-full w-full flex-col items-start justify-start gap-4"
        >
            <table class="w-full text-xs xl:text-sm">
                <tr class="">
                    <th
                        class="w-1/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        ID
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Email
                    </th>
                    <th
                        class="w-3/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Vai trò
                    </th>
                    <th
                        class="w-4/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Địa điểm làm việc
                    </th>
                    <th
                        class=" border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
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
                            @keyup="searchById($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="email"
                            placeholder="Email"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup="searchByEmail($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <select
                            name=""
                            id=""
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            v-model="roleFilter"
                            @change="changeRoleFilter"
                        >
                            <option value="Vai trò">Vai trò</option>
                            <option value="Trưởng điểm tập kết">
                                Trưởng điểm tập kết
                            </option>
                            <option value="Trưởng điểm giao dịch">
                                Trưởng điểm giao dịch
                            </option>
                        </select>
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Địa điểm làm việc"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup="
                                searchByEmployeeLocation($event.target.value)
                            "
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
                        {{ employee.role }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ employee.location }}
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

            <!-- Phân trang  -->
            <div class="flex items-center justify-center gap-2 px-2">
                <font-awesome-icon
                    icon="fa-solid fa-arrow-left"
                    class="text-lg hover:cursor-pointer"
                    v-if="currentPage > 1"
                    @click="switchPage(currentPage - 1)"
                />
                <div class="flex items-center justify-center gap-2">
                    <div
                        class="flex h-8 w-8 items-center justify-center border border-black hover:bg-indigo-500 hover:text-white"
                        v-for="page in totalPage"
                        :key="page"
                        :class="
                            page === currentPage
                                ? 'bg-indigo-500 text-white'
                                : ''
                        "
                        @click="getEmployees(page)"
                    >
                        {{ page }}
                    </div>
                </div>
                <font-awesome-icon
                    icon="fa-solid fa-arrow-right"
                    class="text-lg hover:cursor-pointer"
                    v-if="currentPage < totalPage"
                    @click="switchPage(currentPage + 1)"
                />
            </div>
        </div>
        <base-dialog
            :show="!!clickDelete.value"
            title="Xác nhận xóa tài khoản"
            @close="confirmDelete(clickDelete.id)"
            @exit="this.clickDelete = { value: false, id: null }"
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
    data() {
        return {
            isLoading: false,
            error: null,
            idFilter: "default",
            currentPage: 1,
            totalPage: 0,
            totalResult: 0,
            employees: [],
            roleFilter: "Vai trò",
            clickDelete: {
                value: false,
                id: null,
            },
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
                this.getEmployees(this.currentPage);
            }
        },
        async changeRoleFilter() {
            if (this.roleFilter === "Vai trò") {
                await this.getEmployees(this.currentPage);
            } else if (this.roleFilter === "Trưởng điểm tập kết") {
                await this.getEmployees(this.currentPage);
                this.employees = this.employees.filter(
                    (employee) => employee.role === "Trưởng điểm tập kết",
                );
            } else if (this.roleFilter === "Trưởng điểm giao dịch") {
                await this.getEmployees(this.currentPage);
                this.employees = this.employees.filter(
                    (employee) => employee.role === "Trưởng điểm giao dịch",
                );
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
        async searchByEmployeeLocation(string) {
            if (string === "") {
                this.getEmployees(this.currentPage);
            } else {
                await this.getEmployees(this.currentPage);
                this.employees = this.employees.filter((employee) =>
                    this.removeAccents(
                        employee.location.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },
        async searchByEmail(string) {
            if (string === "") {
                this.getEmployees(this.currentPage);
            } else {
                await this.getEmployees(this.currentPage);
                this.employees = this.employees.filter((employee) =>
                    this.removeAccents(employee.email.toLowerCase()).includes(
                        this.removeAccents(string.toLowerCase()),
                    ),
                );
            }
        },
        async searchById(string) {
            if (string === "") {
                this.getEmployees(this.currentPage);
            } else {
                await this.getEmployees(this.currentPage);
                this.employees = this.employees.filter((employee) =>
                    this.removeAccents(employee.id.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async getEmployees(page = 1) {
            try {
                const result = await this.$store.dispatch(
                    "manager/getAllLeader",
                    page,
                );
                this.employees = result.employees;
                this.totalPage = result.totalPage;
                this.totalResult = result.totalResult;

                //change url
                this.$router.push({
                    path: "/manager/account/list",
                    query: { page: page },
                });
            } catch (error) {
                this.error = error.message;
            }
        },
        switchPage(page) {
            this.currentPage = page;
            this.getEmployees(page);
        },
        clickDeleteEmployee(id) {
            this.clickDelete = {
                value: true,
                id: id,
            };
        },
        async test() {
            this.clickDelete = {
                value: false,
                id: null,
            };
        },
        async confirmDelete(id) {
            try {
                this.isLoading = true;
                await this.$store.dispatch("manager/deleteLeader", id);
                this.clickDelete = {
                    value: false,
                    id: null,
                };
                this.isLoading = false;
                this.$notify({
                    title: "Xóa tài khoản thành công!",
                });
                this.getEmployees(this.currentPage);
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
    },
    mounted() {
        // get page query from url
        const page = this.$route.query.page;
        if (page) {
            this.currentPage = page;
            this.getEmployees(page);
        } else {
            // if no page query, get page 1
            this.getEmployees(1);
        }
    },
};
</script>

<style scoped></style>
