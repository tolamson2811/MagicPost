<template>
    <div class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex items-center">
        <!-- list danh sách tài khoản  -->
        <div
            class="flex flex-col justify-start items-start h-full w-full gap-4"
        >
            <table class="w-full text-sm">
                <tr class="">
                    <th
                        class="bg-indigo-500 border border-e-2 border-white px-4 py-1 text-white w-2/12"
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
                        Xóa
                    </th>
                </tr>

                <!-- Phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="ID tài khoản"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                            @keyup="searchById($event.target.value)"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="email"
                            placeholder="Email"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                            @keyup="searchByEmail($event.target.value)"
                        />
                    </td>
                    <td class="p-1 mt-1 border-e-2 border-white"></td>
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

            <!-- Phân trang  -->
            <div class="flex justify-center items-center gap-2 px-2">
                <font-awesome-icon
                    icon="fa-solid fa-arrow-left"
                    class="hover:cursor-pointer text-lg"
                    v-if="currentPage > 1"
                    @click="switchPage(currentPage - 1)"
                />
                <div class="flex justify-center items-center gap-2">
                    <div
                        class="w-8 h-8 flex justify-center items-center border border-black hover:bg-indigo-500 hover:text-white"
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
                    class="hover:cursor-pointer text-lg"
                    v-if="currentPage < totalPage"
                    @click="switchPage(currentPage + 1)"
                />
            </div>
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
            currentPage: 1,
            totalPage: 0,
            totalResult: 0,
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
                    page: this.currentPage,
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
                    page: this.currentPage,
                });
            } else {
                await this.getEmployees({
                    location_id: this.location_id,
                    page: this.currentPage,
                });
                this.employees = this.employees.filter((employee) =>
                    this.removeAccents(employee.email.toLowerCase()).includes(
                        this.removeAccents(string.toLowerCase())
                    )
                );
            }
        },
        async searchById(string) {
            if (string === "") {
                this.getEmployees({
                    location_id: this.location_id,
                    page: this.currentPage,
                });
            } else {
                await this.getEmployees({
                    location_id: this.location_id,
                    page: this.currentPage,
                });
                this.employees = this.employees.filter((employee) =>
                    employee.id.toString().includes(string)
                );
            }
        },
        async getEmployees(payload) {
            try {
                const result = await this.$store.dispatch(
                    "aggregation/getAllAggregationEmployees",
                    payload
                );

                this.employees = result.aggregation_employee;
                this.totalPage = result.totalPage;
                this.totalResult = result.totalResult;

                //change url
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        location_id: this.location_id,
                        page: this.currentPage,
                    },
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
        async confirmDelete(id) {
            try {
                this.isLoading = true;
                await this.$store.dispatch(
                    "transaction/deleteTransactionEmployee",
                    id
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
                    page: this.currentPage,
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
                this.leader_id
            );
            this.location_id = res.location_id;
        },
        confirmError() {
            this.error = null;
        },
    },
    async mounted() {
        await this.getLocationId();
        // get page query from url
        const page = this.$route.query.page;
        if (page) {
            this.currentPage = page;
            this.getEmployees({
                location_id: this.location_id,
                page: page,
            });
        } else {
            // if no page query, get page 1
            this.getEmployees({
                location_id: this.location_id,
                page: 1,
            });
        }
    },
};
</script>

<style scoped></style>
