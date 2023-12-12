<template>
    <main class="pt-16 lg:pt-20 bg-indigo-500">
        <!-- banner  -->
        <div class="w-full p-10 flex justify-between items-center">
            <div class="flex items-center gap-4">
                <img
                    src="../assets/images/logo_magicpost.jpg"
                    alt="logo"
                    class="h-60 rounded-full"
                />
                <span class="text-white flex flex-col gap-4">
                    <h1
                        class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                    >
                        Magic Post
                    </h1>
                    <h2
                        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold"
                    >
                        Giao siêu nhanh, giá siêu tốt!
                    </h2>
                </span>
            </div>

            <img
                src="../assets/images/banner.gif"
                alt="banner"
                class="banner"
            />
        </div>

        <!-- Phần dịch vụ cho khách hàng  -->
        <div
            class="py-10 flex flex-col gap-20 justify-center items-center w-full"
        >
            <div class="flex gap-4">
                <button
                    class="bg-indigo-700 py-4 px-10 text-3xl rounded-full font-semibold border-4 text-white"
                >
                    Tra cứu
                </button>
            </div>

            <!-- các chức năng tra cứu  -->
            <div class="w-3/4">
                <div class="flex w-full">
                    <span
                        class="bg-indigo-400 text-white px-4 py-2 text-2xl border hover:cursor-pointer basis-1/3 flex gap-2 items-center"
                        :class="{ 'bg-indigo-700': isSearchOrder }"
                        @click="chooseSearchService('order')"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-magnifying-glass"
                            class="text-red-500"
                        />
                        Tra cứu vận đơn</span
                    >
                    <span
                        class="bg-indigo-400 text-white px-4 py-2 text-2xl border hover:cursor-pointer basis-1/3 flex gap-2 items-center"
                        :class="{ 'bg-indigo-700': isSearchFee }"
                        @click="chooseSearchService('fee')"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-hand-holding-dollar"
                            class="text-yellow-400"
                        />Ước tính cước phí</span
                    >
                    <span
                        class="bg-indigo-400 text-white px-4 py-2 text-2xl border hover:cursor-pointer basis-1/3 flex gap-2 items-center"
                        :class="{ 'bg-indigo-700': isSearchTransaction }"
                        @click="chooseSearchService('transaction')"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-map-location-dot"
                            class="text-green-700"
                        />
                        Tìm điểm giao dịch</span
                    >
                </div>

                <!-- tra cứu vận đơn -->
                <transition name="element">
                    <div class="bg-indigo-400 p-4" v-if="isSearchOrder">
                        <div class="flex gap-2 w-full">
                            <input
                                type="text"
                                placeholder="VD: 123412421"
                                id="orderId"
                                class="rounded-2xl p-2 basis-11/12"
                            />
                            <button
                                for="orderId"
                                class="search-btn text-white px-4 py-2 text-center basis-1/12 rounded-md font-bold text-base hover:cursor-pointer hover:opacity-80"
                            >
                                Tra cứu
                            </button>
                        </div>

                        <div
                            class="bg-white mt-4 p-4 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg flex flex-col gap-2"
                        >
                            <span class="flex gap-2">
                                <h1 class="font-bold">Mã vận đơn:</h1>
                                <p class="">908xxxeqw</p>
                            </span>
                            <span class="flex gap-2">
                                <h1 class="font-bold">Ngày tạo đơn:</h1>
                                <p class="">24/11/2003</p>
                            </span>
                            <span class="flex gap-2">
                                <h1 class="font-bold">Trạng thái:</h1>
                                <p class="">Đang vận chuyển</p>
                            </span>
                            <span class="flex flex-col">
                                <h1 class="font-bold">
                                    Theo dõi quá trình đơn hàng:
                                </h1>
                                <div>
                                    <span class="flex gap-1">
                                        <h2 class="italic text-red-500">
                                            12/12/2023:
                                        </h2>
                                        <p>
                                            Đơn hàng đã được gửi tới điểm giao
                                            dịch.
                                        </p>
                                    </span>
                                    <span class="flex gap-1">
                                        <h2 class="italic text-red-500">
                                            12/12/2023:
                                        </h2>
                                        <p>
                                            Đơn hàng đã được gửi tới điểm giao
                                            dịch.
                                        </p>
                                    </span>
                                    <span class="flex gap-1">
                                        <h2 class="italic text-red-500">
                                            12/12/2023:
                                        </h2>
                                        <p>
                                            Đơn hàng đã được gửi tới điểm giao
                                            dịch.
                                        </p>
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                </transition>

                <!-- ước tính cước phí -->
                <transition name="element">
                    <div
                        class="bg-indigo-400 p-4 flex flex-col gap-8"
                        v-if="isSearchFee"
                    >
                        <div class="grid grid-cols-2 gap-4">
                            <select
                                class="p-2 hover:cursor-pointer"
                                v-model="sentProvince"
                                @change="handleSentProvinceChange"
                            >
                                <option value="Tỉnh gửi">Tỉnh gửi</option>
                                <option
                                    v-for="province in provinces"
                                    :value="province.name"
                                >
                                    {{ province.name }}
                                </option>
                            </select>

                            <select
                                class="p-2 hover:cursor-pointer"
                                name=""
                                id=""
                            >
                                <option value="">Tỉnh nhận</option>
                                <option
                                    v-for="province in provinces"
                                    :value="province.name"
                                >
                                    {{ province.name }}
                                </option>
                            </select>

                            <select
                                class="p-2 hover:cursor-pointer"
                                name=""
                                id=""
                            >
                                <option value="Huyện gửi">Huyện gửi</option>
                                <option
                                    v-for="district in districts"
                                    :value="district.name"
                                >
                                    {{ district.name }}
                                </option>
                            </select>

                            <select
                                class="p-2 hover:cursor-pointer"
                                name=""
                                id=""
                            >
                                <option value="">Huyện nhận</option>
                            </select>

                            <select
                                class="p-2 hover:cursor-pointer"
                                name=""
                                id=""
                            >
                                <option value="">Xã gửi</option>
                            </select>

                            <select
                                class="p-2 hover:cursor-pointer"
                                name=""
                                id=""
                            >
                                <option value="">Xã nhận</option>
                            </select>

                            <select
                                class="p-2 hover:cursor-pointer"
                                name=""
                                id=""
                            >
                                <option value="">Loại hàng</option>
                            </select>

                            <select
                                class="p-2 hover:cursor-pointer"
                                name=""
                                id=""
                            >
                                <option value="">Khối lượng</option>
                            </select>
                        </div>

                        <button
                            class="search-btn text-white px-4 py-2 text-center rounded-md font-bold text-2xl hover:cursor-pointer hover:opacity-80"
                        >
                            Tra cứu
                        </button>

                        <div
                            class="bg-white mt-4 p-4 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
                        >
                            <h1 class="text-xl font-bold">Ước tính chi phí</h1>
                            <span class="flex gap-2">
                                <h2>Điểm giao dịch gửi:</h2>
                                <p class="font-bold">Cầu Giấy, Hà Nội</p>
                            </span>
                            <span class="flex gap-2">
                                <h2>Điểm giao dịch nhận:</h2>
                                <p class="font-bold">Võ Nhai, Thái Nguyên</p>
                            </span>
                            <span class="flex gap-2">
                                <h2>Chi phí:</h2>
                                <p class="font-bold">20.000 VNĐ</p>
                            </span>
                        </div>
                    </div>
                </transition>

                <!-- tìm điểm giao dịch -->
                <transition name="element">
                    <div
                        class="bg-indigo-400 p-4 flex flex-col gap-8"
                        v-if="isSearchTransaction"
                    >
                    <div class="flex gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Nhập địa chỉ (Tỉnh)"
                                id="transactionId"
                                class="rounded-2xl p-2 basis-11/12"
                            />
                            <button
                                for="transactionId"
                                class="search-btn text-white px-4 py-2 text-center basis-1/12 rounded-md font-bold text-base hover:cursor-pointer hover:opacity-80"
                            >
                                Tra cứu
                            </button>
                        </div>
                        <div
                            class="bg-white mt-4 p-4 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
                        >
                            <span class="flex gap-2">
                                <h2>Bưu cục Cầu Giấy:</h2>
                                <p class="font-bold">20 - Ngõ 20 - Hồ Tùng Mậu</p>
                            </span>
                            <span class="flex gap-2">
                                <h2>Bưu cục Thanh Xuân</h2>
                                <p class="font-bold">2 - Ngõ 2 - xxx
</p>
                            </span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <!-- Phần show thông tin dịch vụ của công ty -->
        <div class="py-10 flex flex-col gap-20 justify-center items-center w-full">
            <button class="bg-indigo-700 py-4 px-10 text-3xl rounded-full font-semibold border-4 text-white">
                Dịch vụ
            </button>

            <div class="w-3/4 container px-20">
                <div class="flex flex-col gap-20">
                    <div class="flex flex-row gap-32">
                        <div class="mx-4 my-4">
                            <div class="block w-8/12 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 content-between">
                                <div class="flex flex-row gap-8">
                                    <font-awesome-icon class="content-center" icon="fa-solid fa-truck-fast" />
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 w-full ">Chuyển phát nhanh</h5>   
                                </div>
                                <p class="font-normal text-gray-700 ">Dịch vụ nhận gửi, vận chuyển và phát các loại thư, tài liệu, thư từ trong nước theo chỉ tiêu thời gian tiêu chuẩn, Không áp dụng với các đơn hàng có thu hộ COD [..]</p>
                            </div>
                        </div>
                        <div class="mx-4 my-4">
                            <a class="block w-8/12 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 content-between">
                                <div class="flex flex-row gap-8">
                                <font-awesome-icon icon="fa-solid fa-truck-fast" />
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Chuyển phát hỏa tốc</h5>   
                                </div>
                                <p class="font-normal text-gray-700 ">Dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng hóa, vật phẩm có độ ưu tiên cao nhất với chỉ tiêu thời gian toàn trình không quá 24 giờ [...]</p>
                            </a>
                        </div>
                    </div>
                    <div class="flex flex-row gap-32">
                        <div class="mx-4 my-4">
                            <a class="block w-8/12 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 content-between">
                                <div class="flex flex-row gap-8">
                                    <font-awesome-icon icon="fa-solid fa-truck-fast" />
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Chuyển phát tiết kiệm</h5>   
                                </div>
                                <p class="font-normal text-gray-700 ">Dịch vụ nhận gửi, vận chuyển và phát các loại hàng hóa, bưu kiện không giới hạn mức trọng lượng, theo chỉ tiêu thời gian tiêu chuẩn, giá cước hợp lý [...]</p>
                            </a>
                        </div>
                        <div class="mx-4 my-4">
                            <a class="block w-8/12 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 content-between">
                                <div class="flex flex-row gap-8">
                                    <font-awesome-icon icon="fa-solid fa-truck-fast" />
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Chuyển phát đặc biệt</h5>   
                                </div>
                                <p class="font-normal text-gray-700 ">Dịch vụ nhận gửi, vận chuyển và phát các loại hàng hóa đặc biệt, quá trình tiếp nhận, đóng gói, quy định về tem nhãn cảnh báo riêng cho từng loại [...]</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hỗ trợ -->
        <div class="py-10 flex flex-col gap-20 justify-center items-center w-full">
            <button class="bg-indigo-700 py-4 px-10 text-3xl rounded-full font-semibold border-4 text-white">
                Hỗ trợ
            </button>
                <div>
            <div class="  py-12 xl:pt-12 xl:pb-0">
            <div class=" mt-12 container mx-auto h-full " style="color: #0c4a6e;">
            <div class="flex flex-col xl:flex-row items-center justify-between h-fit">
                <div class="intro-text xl:w-[48%] text-center xl:text-left">
                    <div class="h1 mb-6 mt">Email: Magicpost.cn1.uet@gmail.com</div>
                    <div class="h1 mb-6 mt">Hotline: +12345678</div>
                    <div class="h1 mb-6 mt">Fanpage: Magic Post</div>
                </div>
                
                
                <div class="object-contain hidden xl:flex xl:max-w-7xl w-{800} h-{600}">
                    <img src="../../src/assets/images//logo_magicpost.png" alt="">
                </div>
            </div>
        </div>
    </div>
        </div>
            <button class="bg-indigo-700 py-4 px-10 text-3xl rounded-full font-semibold border-4 text-white">
                Đội ngũ của chúng tôi
            </button>
            <div class="flex flex-row gap-16 ">
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <img class="rounded-t-lg w-{16px} h-{16px}" src="../../src/assets/images/logo_magicpost.jpg" alt="" />
                    <div class="p-5">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Nguyen Duc Thien</h5>
                    <p class="mb-3 font-normal text-gray-700 ">Chairman of directors</p>
                </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <img class="rounded-t-lg" src="../../src/assets/images/logo_magicpost.jpg" alt="" />
                    <div class="p-5">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">To Lam Son</h5>
                    <p class="mb-3 font-normal text-gray-700 ">Chief Executive Officer</p>
                </div>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <img class="rounded-t-lg" src="../../src/assets/images/logo_magicpost.jpg" alt="" />
                    <div class="p-5">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Ta Khanh Phuong</h5>
                    <p class="mb-3 font-normal text-gray-700 ">Director of Development</p>
                </div>
                </div>
            </div>
        </div>
        <!--  -->
        <div>
            <div class="  py-12 xl:pt-12 xl:pb-0">
            <div class=" mt-12 container mx-auto h-full " style="color: #0c4a6e;">
            <div class="flex flex-col xl:flex-row items-center justify-between h-fit">
                <div class="intro-text xl:w-[48%] text-center xl:text-left">
                    <div class="h1 mb-6 mt">Email: Magicpost.cn1.uet@gmail.com</div>
                    <div class="h1 mb-6 mt">Hotline: +12345678</div>
                    <div class="h1 mb-6 mt">Fanpage: Magic Post</div>
                </div>
                
                
                <div class="object-contain hidden xl:flex xl:max-w-7xl w-{800} h-{600}">
                    <img src="../../src/assets/images//logo_magicpost.png" alt="">
                </div>
            </div>
        </div>
    </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            isSearchOrder: true,
            isSearchFee: false,
            isSearchTransaction: false,
            provinces: [],
            districts: [],
            wards: [],
            sentProvince: "Tỉnh gửi",
            receiveProvince: "Tỉnh nhận",
            sentDistrict: "Huyện gửi",
            receiveDistrict: "Huyện nhận",
            sentWard: "Xã gửi",
            receiveWard: "Xã nhận",
        };
    },
    methods: {
        chooseService(type) {
            switch (type) {
                case "search":
                    this.isSearch = true;
                    this.isService = false;
                    break;
                case "service":
                    this.isSearch = false;
                    this.isService = true;
                    break;
            }
        },
        chooseSearchService(type) {
            switch (type) {
                case "order":
                    this.isSearchOrder = true;
                    this.isSearchFee = false;
                    this.isSearchTransaction = false;
                    break;
                case "fee":
                    this.isSearchOrder = false;
                    this.isSearchFee = true;
                    this.isSearchTransaction = false;
                    break;
                case "transaction":
                    this.isSearchOrder = false;
                    this.isSearchFee = false;
                    this.isSearchTransaction = true;
                    break;
            }
        },
        async setProvinces() {
            await this.$store.dispatch("address/getProvinces");
            this.provinces = this.$store.getters["address/getProvinces"];
        },
        async setDistricts(provinceId) {
            await this.$store.dispatch("address/getDistricts", provinceId);
            this.districts = this.$store.getters["address/getDistricts"];
        },
        async handleSentProvinceChange() {
            this.districts = [];
            let provinceCode = "";
            for (let province of this.provinces) {
                if (province.name === this.sentProvince) {
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
    mounted() {
        this.setProvinces();
        this.$store.dispatch("address/getDistricts");
        this.$store.dispatch("address/getWards");
    },
};
</script>

<style scoped>
.banner {
    height: 800px;
}

.element-enter-from {
    opacity: 0;
    transform: translateY(-30px);
}

.element-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.element-enter-active {
    transition: all 0.5 s ease-out;
}

.search-btn {
    background-color: #303030;
}
</style>
