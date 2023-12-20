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
                        <select
                            name=""
                            id=""
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
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
                    <td class="p-1 mt-1 border-e-2 border-white">
                        <input
                            type="text"
                            placeholder="Địa điểm làm việc"
                            class="px-2 py-1 border border-black w-full rounded outline-green-500 text-center"
                            @keyup="
                                searchByEmployeeLocation($event.target.value)
                            "
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
                        {{ employee.role }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        {{ employee.location }}
                    </td>
                    <td class="border-e-2 border-white text-center">
                        <font-awesome-icon
                            icon="fa-solid fa-trash"
                            class="text-red-500 hover:cursor-pointer hover:text-red-600"
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            idFilter: "default",
            currentPage: 1,
            totalPage: 0,
            totalResult: 0,
            employees: [],
            roleFilter: "Vai trò",
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
                    (employee) => employee.role === "Trưởng điểm tập kết"
                );
            } else if (this.roleFilter === "Trưởng điểm giao dịch") {
                await this.getEmployees(this.currentPage);
                this.employees = this.employees.filter(
                    (employee) => employee.role === "Trưởng điểm giao dịch"
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
                        employee.location.toLowerCase()
                    ).includes(this.removeAccents(string.toLowerCase()))
                );
            }
        },
        async getEmployees(page = 1) {
            try {
                const result = await this.$store.dispatch(
                    "manager/getAllLeader",
                    page
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
                console.log(error);
            }
        },
        switchPage(page) {
            this.currentPage = page;
            this.getEmployees(page);
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
