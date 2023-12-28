<template>
    <main>
        <div id="delivery-receipt" class="flex flex-col gap-8 pt-4">
            <!-- banner  -->
            <div class="flex items-center justify-between px-12">
                <span class="flex items-center gap-4">
                    <img
                        src="../../../../assets/images/logo_magicpost.jpg"
                        alt="logo"
                        class="h-28 w-28 rounded-full"
                    />
                    <h1 class="text-xl font-semibold italic text-indigo-500">
                        DỊCH VỤ CHUYỂN PHÁT NHANH
                    </h1>
                </span>

                <qrcode-vue
                    :value="linkQrCode"
                    class="self-center"
                ></qrcode-vue>
            </div>

            <!-- Phần thông tin  -->
            <div class="grid w-full grid-cols-2 px-2">
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">1. Địa chỉ người gửi</h1>
                    <div class="flex flex-col gap-2">
                        <span class="flex items-center gap-1">
                            <p>Địa chỉ: {{ package_detail.sender_address }}</p>
                        </span>
                        <span class="flex items-center gap-1">
                            <p>
                                Số điện thoại: {{ package_detail.sender_phone }}
                            </p>
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">2. Địa chỉ người nhận</h1>
                    <div class="flex flex-col gap-2">
                        <span class="flex items-center gap-1">
                            <p>
                                Địa chỉ: {{ package_detail.receiver_address }}
                            </p>
                        </span>
                        <span class="flex items-center gap-1">
                            <p>
                                Số điện thoại:
                                {{ package_detail.receiver_phone }}
                            </p>
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">3. Loại hàng gửi</h1>
                    <div class="flex justify-between px-10">
                        <span class="flex items-center gap-1">
                            <input
                                type="checkbox"
                                :checked="package_detail.type === 'Tài liệu'"
                                class="select-none"
                            />
                            <label class="mb-5 font-semibold">Tài liệu</label>
                        </span>
                        <span class="flex items-center gap-1">
                            <input
                                type="checkbox"
                                :checked="package_detail.type === 'Hàng hóa'"
                                class="select-none"
                            />
                            <label class="mb-5 font-semibold">Hàng hóa</label>
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">4. Cước</h1>
                    <div class="flex flex-col gap-2">
                        <span class="flex items-center gap-1">
                            <p>Tổng thu: {{ package_detail.price }}</p>
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">5. Khối lượng</h1>
                    <div class="flex flex-col gap-2">
                        <span class="flex items-center gap-1">
                            <p>
                                Khối lượng thực tế:
                                {{ package_detail.weight }}kg
                            </p>
                        </span>
                        <span class="flex items-center gap-1">
                            <p>Khối lượng quy đổi: 0kg</p>
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">
                        6. Chỉ dẫn của người gửi khi không phát được bưu gửi
                    </h1>
                    <div
                        class="grid w-full grid-cols-2 items-center justify-center"
                    >
                        <span
                            class="flex w-full items-center justify-center gap-1"
                        >
                            <input type="checkbox" />
                            <label class="mb-5 font-semibold"
                                >Chuyển hoàn ngay</label
                            >
                        </span>
                        <span
                            class="flex w-full items-center justify-center gap-1"
                        >
                            <input type="checkbox" />
                            <label class="mb-5 font-semibold"
                                >Chuyển hoàn trước ngày</label
                            >
                        </span>
                        <span
                            class="flex w-full items-center justify-center gap-1"
                        >
                            <input type="checkbox" />
                            <label class="mb-5 font-semibold"
                                >Chuyển hoàn khi hết thời gian lưu trữ</label
                            >
                        </span>
                        <span
                            class="flex w-full items-center justify-center gap-1"
                        >
                            <input type="checkbox" />
                            <label class="mb-5 font-semibold">Hủy</label>
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">7. Cam kết của người gửi</h1>
                    <div class="flex flex-col gap-2">
                        <p>
                            Tôi chấp nhận các điều khoản tại mặt sau phiếu gửi
                            và cam đoan bưu gửi này không chứa những mặt hàng
                            nguy hiểm, cấm gửi. Trường hợp không phát được hãy
                            thực chỉ dẫn tại mục 6, tôi sẽ trả cước chuyển hoàn.
                        </p>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">8. Ngày giờ gửi</h1>
                    <div class="flex flex-col gap-2">
                        <span class="flex items-center gap-1">
                            <p>{{ package_detail.createdAt }}</p>
                        </span>
                        <span class="flex items-center gap-1">
                            <p class="font-bold">Chữ ký người gửi</p>
                        </span>
                    </div>
                </div>
                <div
                    class="flex flex-col items-center gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">9. Bưu cục chấp nhận</h1>
                    <div class="flex flex-col gap-2 pb-8">
                        <p class="font-semibold">Chữ ký giao dịch viên nhận</p>
                    </div>
                </div>
                <div
                    class="flex flex-col gap-1 border-2 border-black px-2 pb-4"
                >
                    <h1 class="font-bold">10. Ngày giờ nhận</h1>
                    <div class="flex flex-col gap-2">
                        <span class="flex items-center gap-1">
                            <p class="font-semibold">...h...p/.../.../20...</p>
                        </span>
                        <span class="flex items-center gap-1">
                            <p class="font-semibold">
                                Người nhận/Người được ủy quyền nhận (Ký, ghi rõ
                                họ tên)
                            </p>
                        </span>
                    </div>
                </div>
                <p
                    class="col-span-2 flex w-full items-center justify-center py-2 font-bold"
                >
                    Hotline: 1900 2811 2811 - Website:
                    https://magicpost.vercel.app - Email: cskh@magicpost.com.vn
                </p>
            </div>
        </div>

        <button
            @click="exportToPDF(package_id)"
            class="mb-4 ml-4 mt-10 rounded bg-indigo-400 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-indigo-500"
        >
            In biên nhận chuyển phát
        </button>
    </main>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import html2pdf from "html2pdf.js";
export default {
    props: ["package_id"],
    components: {
        QrcodeVue,
    },
    data() {
        return {
            package_detail: {},
            error: null,
        };
    },
    methods: {
        async getPackageDetail() {
            try {
                this.package_detail = await this.$store.dispatch(
                    "package/getPackageDetail",
                    this.package_id,
                );

                console.log(this.package_detail);
            } catch (error) {
                console.log(error);
                this.error = error.message;
            }
        },
        //Phần in biên nhận chuyển phát
        exportToPDF(package_id) {
            html2pdf(document.getElementById("delivery-receipt"), {
                filename: `Biên nhận chuyển phát đơn hàng ${package_id}.pdf`,
            });
        },
    },
    computed: {
        linkQrCode() {
            const apiUrl = this.$store.getters.getApiUrl;
            if (apiUrl === "http://localhost:8080/") {
                return `http://localhost:5173/package/detail/${this.package_id}`;
            }
            return `https://magicpost.vercel.app/package/detail/${this.package_id}`;
        },
    },
    async mounted() {
        await this.getPackageDetail();
        this.exportToPDF(this.package_id);
    },
};
</script>
