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
                    class="bg-indigo-400 py-4 px-10 text-3xl rounded-full font-semibold border-4 text-white"
                    :class="{ 'bg-indigo-700': isSearch }"
                    @click="chooseService('search')"
                >
                    Tra cứu
                </button>
                <button
                    class="bg-indigo-400 py-4 px-10 text-3xl rounded-full font-semibold border-4 text-white"
                    :class="{ 'bg-indigo-700': isService }"
                    @click="chooseService('service')"
                >
                    Dịch vụ
                </button>
            </div>

            <!-- các chức năng tra cứu  -->
            <div class="w-3/4" v-if="isSearch">
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
                        <font-awesome-icon icon="fa-solid fa-map-location-dot" class=" text-green-700"/>
                        Tìm điểm giao dịch</span
                    >
                </div>

                <!-- tra cứu vận đơn -->
                <div class="bg-indigo-400 p-4" v-if="isSearchOrder">
                    <div class="flex gap-2 w-full">
                        <input
                            type="text"
                            placeholder="VD: 123412421"
                            id="orderId"
                            class="rounded-2xl p-2 basis-11/12"
                        />
                        <label
                            for="orderId"
                            class="bg-black text-white px-4 py-2 text-center basis-1/12 rounded-md font-bold text-xl hover:cursor-pointer hover:opacity-80"
                            >Tra cứu</label
                        >
                    </div>

                    <div
                        class="bg-white mt-4 p-4 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
                    >
                        <span class="flex gap-2">
                            <h1>Mã vận đơn:</h1>
                            <p class="font-bold">908xxxeqw</p>
                        </span>
                        <span class="flex gap-2">
                            <h1>Ngày tạo đơn:</h1>
                            <p class="font-bold">24/11/2003</p>
                        </span>
                        <span class="flex gap-2">
                            <h1>Trạng thái:</h1>
                            <p class="font-bold">Đang vận chuyển</p>
                        </span>
                    </div>
                </div>

                <!-- ước tính cước phí -->
                <div
                    class="bg-indigo-400 p-4 flex flex-col gap-8"
                    v-if="isSearchFee"
                >
                    <div class="grid grid-cols-2 gap-4">
                        <select class="p-2 hover:cursor-pointer" name="" id="">
                            <option value="">Tỉnh gửi</option>
                        </select>

                        <select class="p-2 hover:cursor-pointer" name="" id="">
                            <option value="">Tỉnh nhận</option>
                        </select>

                        <select class="p-2 hover:cursor-pointer" name="" id="">
                            <option value="">Huyện gửi</option>
                        </select>

                        <select class="p-2 hover:cursor-pointer" name="" id="">
                            <option value="">Huyện nhận</option>
                        </select>

                        <select class="p-2 hover:cursor-pointer" name="" id="">
                            <option value="">Loại hàng</option>
                        </select>

                        <select class="p-2 hover:cursor-pointer" name="" id="">
                            <option value="">Khối lượng</option>
                        </select>
                    </div>

                    <button
                        class="bg-black text-white px-4 py-2 text-center rounded-md font-bold text-2xl hover:cursor-pointer hover:opacity-80"
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

                <!-- tìm điểm giao dịch -->
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            isSearch: true,
            isService: false,
            isSearchOrder: true,
            isSearchFee: false,
            isSearchTransaction: false,
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
    },
};
</script>

<style scoped>
.banner {
    height: 800px;
}
</style>
