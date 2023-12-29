<template>
    <div class="mt-0 flex w-full basis-3/4 items-center bg-gray-100 xl:mt-20">
        <!-- list danh sách hàng hóa  -->
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
                        Ngày nhập kho
                    </th>
                    <th
                        class="w-4/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Địa chỉ người nhận
                    </th>
                    <th
                        class="w-2/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Cập nhật đơn hàng
                    </th>

                    <th
                        class="w-3/12 border border-e-2 border-white bg-indigo-500 px-4 py-1 text-white"
                    >
                        Xem chi tiết
                    </th>
                </tr>

                <!-- Phần tìm kiếm theo từng danh mục  -->
                <tr class="bg-indigo-300">
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="ID đơn hàng"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByPackageId($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Ngày nhập kho"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="searchByTimeArrived($event.target.value)"
                        />
                    </td>
                    <td class="mt-1 w-3/12 border-e-2 border-white p-1">
                        <input
                            type="text"
                            placeholder="Địa chỉ người nhận"
                            class="w-full rounded border border-black px-2 py-1 text-center outline-green-500"
                            @keyup.enter="
                                searchByReceiverAddress($event.target.value)
                            "
                        />
                    </td>
                    <td class="mt-1 border-e-2 border-white p-1"></td>
                    <td
                        class="mt-1 flex items-center justify-center border-e-2 border-white p-1 font-bold italic text-rose-600"
                    >
                        <p>{{ packageStatuses.length }} đơn hàng</p>
                    </td>
                </tr>

                <!-- Hiển thị data  -->
                <tr
                    class="bg-gray-200"
                    v-for="(status, index) in packageStatuses"
                    :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'"
                    :key="status.id"
                >
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ status.package_id }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ status.time_import }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        {{ status.receiver_address }}
                    </td>
                    <td class="border-e-2 border-white py-1 text-center">
                        <button
                            class="rounded-lg bg-rose-500 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-rose-600"
                            @click="handleClickUpdateStatus(status)"
                        >
                            Cập nhật
                        </button>
                    </td>

                    <td class="border-e-2 border-white py-1 text-center">
                        <router-link
                            class="rounded-lg bg-indigo-400 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-indigo-500"
                            :to="'/package/detail/' + status.package_id"
                        >
                            Xem chi tiết
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="error = null"
            @exit="error=null"
        >
            <p>{{ error }}</p>
        </base-dialog>
        <update-status
            :show="isUpdatePackageStatus"
            title="Cập nhật đơn hàng"
            @exit="resetFormUpdateStatus"
            @close="handleConfirmUpdatePackageStatus"
        >
            <form class="flex flex-col gap-2">
                <div class="grid grid-cols-3 items-center justify-start gap-2">
                    <label for="action" class="text-start font-semibold"
                        >Trạng thái:</label
                    >
                    <select
                        name=""
                        id="action"
                        class="col-span-2 rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.status"
                    >
                        <option value="Chuyển đến điểm tập kết">
                            Chuyển đến điểm tập kết
                        </option>
                        <option value="Chuyển đến điểm giao dịch">
                            Chuyển đến điểm giao dịch
                        </option>
                    </select>
                </div>

                <div
                    class="grid grid-cols-3 items-center justify-start gap-2"
                    v-if="
                        updatePackageStatus.status === 'Chuyển đến điểm tập kết'
                    "
                >
                    <label for="aggregation" class="text-start font-semibold"
                        >Điểm tập kết:</label
                    >
                    <select
                        name=""
                        id="action"
                        class="col-span-2 rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.aggregation"
                    >
                        <option value="Điểm tập kết">Điểm tập kết</option>
                        <option
                            v-for="province in provinces"
                            :key="province.code"
                            :value="province.name"
                        >
                            {{ province.name }}
                        </option>
                    </select>
                </div>

                <div
                    class="grid grid-cols-3 items-center justify-start gap-2"
                    v-if="
                        updatePackageStatus.status ===
                        'Chuyển đến điểm giao dịch'
                    "
                >
                    <label for="aggregation" class="text-start font-semibold"
                        >Tỉnh/TP:</label
                    >
                    <select
                        name=""
                        id="action"
                        class="col-span-2 rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.province"
                        @change="handleChangeProvince"
                    >
                        <option value="Tỉnh/Thành phố">Tỉnh/Thành phố</option>
                        <option
                            v-for="province in provinces"
                            :key="province.code"
                            :value="province.name"
                        >
                            {{ province.name }}
                        </option>
                    </select>
                </div>

                <div
                    class="grid grid-cols-3 items-center justify-start gap-2"
                    v-if="
                        updatePackageStatus.status ===
                        'Chuyển đến điểm giao dịch'
                    "
                >
                    <label for="district" class="text-start font-semibold"
                        >Quận/Huyện:</label
                    >
                    <select
                        name=""
                        id="district"
                        class="col-span-2 rounded border border-black px-2 py-1"
                        v-model="updatePackageStatus.district"
                    >
                        <option value="Quận/Huyện">Quận/Huyện</option>
                        <option
                            v-for="district in districts"
                            :key="district.code"
                            :value="district.name"
                        >
                            {{ district.name }}
                        </option>
                    </select>
                </div>
            </form>
        </update-status>
    </div>
</template>

<script>
export default {
    props: ["employee_id"],
    data() {
        return {
            provinces: [],
            districts: [],
            location_id: null,
            packageStatuses: [],
            error: null,
            isLoading: false,
            isUpdatePackageStatus: false,
            updatePackageStatus: {
                package_id: null,
                status: "Chuyển đến điểm tập kết",
                location_id: null,
                aggregation: "Điểm tập kết",
                province: "Tỉnh/Thành phố",
                district: "Quận/Huyện",
            },
        };
    },
    methods: {
        async getLocationId() {
            try {
                const res = await this.$store.dispatch(
                    "manager/getEmployeeById",
                    this.employee_id,
                );

                this.location_id = res.location_id;
            } catch (error) {
                this.error = error.message;
            }
        },
        async getPackageStatusByLocationId() {
            try {
                this.isLoading = true
                const res = await this.$store.dispatch(
                    "package/getAggregationPackageInWarehouse",
                    this.location_id,
                );
                this.packageStatuses = res;
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false
        },
        //Phần search
        removeAccents(str) {
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
        },
        async searchByPackageId(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.package_id.toString()).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByTimeArrived(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(order.time_import).includes(
                        this.removeAccents(string),
                    ),
                );
            }
        },
        async searchByReceiverAddress(string) {
            if (string === "") {
                this.getPackageStatusByLocationId();
            } else {
                await this.getPackageStatusByLocationId();
                this.packageStatuses = this.packageStatuses.filter((order) =>
                    this.removeAccents(
                        order.receiver_address.toLowerCase(),
                    ).includes(this.removeAccents(string.toLowerCase())),
                );
            }
        },

        //Phần cập nhật trạng thái đơn hàng
        handleClickUpdateStatus(order) {
            this.updatePackageStatus.package_id = order.package_id;
            this.isUpdatePackageStatus = true;
        },
        resetFormUpdateStatus() {
            this.updatePackageStatus = {
                package_id: null,
                status: "Chuyển đến điểm tập kết",
                aggregation: "Điểm tập kết",
                province: "Tỉnh/Thành phố",
                district: "Quận/Huyện",
                location_id: null,
            };
            this.isUpdatePackageStatus = false;
        },
        async handleConfirmUpdatePackageStatus() {
            if (this.updatePackageStatus.status === "Chuyển đến điểm tập kết") {
                if (this.updatePackageStatus.aggregation === "Điểm tập kết") {
                    alert("Vui lòng chọn điểm tập kết!");
                    return;
                }
                this.updatePackageStatus.location_id =
                    await this.getLocationIdOfAggregationByName(
                        this.updatePackageStatus.aggregation,
                    );
            } else if (
                this.updatePackageStatus.status === "Chuyển đến điểm giao dịch"
            ) {
                if (this.updatePackageStatus.province === "Tỉnh/Thành phố") {
                    alert("Vui lòng chọn tỉnh/thành phố!");
                    return;
                }
                if (this.updatePackageStatus.district === "Quận/Huyện") {
                    alert("Vui lòng chọn quận/huyện!");
                    return;
                }
                this.updatePackageStatus.location_id =
                    await this.getLocationIdOfTransactionByName({
                        province: this.updatePackageStatus.province,
                        district: this.updatePackageStatus.district,
                    });
            }

            let formData = {
                package_id: this.updatePackageStatus.package_id,
                status: this.updatePackageStatus.status,
                location_id: this.updatePackageStatus.location_id,
            };

            try {
                this.isLoading = true;
                await this.$store.dispatch(
                    "package/addPackageStatus",
                    formData,
                );
                this.resetFormUpdateStatus();
                this.isLoading = false;
                this.$notify({
                    title: "Cập nhật đơn hàng thành công!",
                    type: "success",
                });
                this.getPackageStatusByLocationId();
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        async getLocationIdOfAggregationByName(name) {
            try {
                const res = await this.$store.dispatch(
                    "aggregation/getLocationIdByName",
                    name,
                );

                return res;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        async getLocationIdOfTransactionByName(name) {
            try {
                const res = await this.$store.dispatch(
                    "transaction/getLocationIdByName",
                    name,
                );

                return res;
            } catch (error) {
                throw new Error(error.message);
            }
        },

        //lấy dữ liệu tỉnh, thành phố, quận, huyện
        async setProvince() {
            await this.$store.dispatch("address/getProvinces");
            this.provinces = this.$store.getters["address/getProvinces"];
        },
        async handleChangeProvince() {
            this.updatePackageStatus.district = "Quận/Huyện";

            let provinceCode = "";
            for (let province of this.provinces) {
                if (province.name === this.updatePackageStatus.province) {
                    provinceCode = province.code;
                    break;
                }
            }

            const districts = this.$store.getters["address/getDistricts"];

            for (const district in districts) {
                if (districts[district].province_code === provinceCode) {
                    this.districts.push(districts[district]);
                }
            }
        },
    },
    async mounted() {
        this.setProvince();
        this.$store.dispatch("address/getDistricts");
        await this.getLocationId();
        await this.getPackageStatusByLocationId();
    },
};
</script>

<style scoped></style>
