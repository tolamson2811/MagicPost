<template>
    <main class="bg-indigo-500 pt-16 lg:pt-20">
        <!-- banner  -->
        <div
            class="flex w-full flex-col items-center justify-between p-10 xl:flex-row"
        >
            <div class="flex items-center gap-4">
                <img
                    src="../assets/images/logo_magicpost.jpg"
                    alt="logo"
                    class="h-40 rounded-full md:h-44 lg:h-52 xl:h-60"
                />
                <span class="flex flex-col gap-4 text-white">
                    <h1
                        class="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Magic Post
                    </h1>
                    <h2
                        class="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl"
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

        <!-- Phần dịch vụ tra cứu cho khách hàng  -->
        <div
            class="flex w-full flex-col items-center justify-center gap-8 lg:gap-12 xl:gap-20"
            id="search-service"
        >
            <div class="flex gap-4">
                <button
                    class="rounded-full border-4 bg-indigo-700 px-6 py-2 text-base font-semibold text-white sm:text-lg md:px-8 md:py-2 md:text-xl lg:px-9 lg:py-3 lg:text-2xl xl:px-10 xl:py-4 xl:text-3xl"
                >
                    Tra cứu
                </button>
            </div>

            <!-- các chức năng tra cứu  -->
            <div class="w-full px-2 shadow md:w-4/5 md:px-0 xl:w-3/4">
                <div class="flex w-full">
                    <span
                        class="flex w-full items-center justify-center gap-2 border bg-indigo-400 px-4 py-2 text-sm text-white hover:cursor-pointer sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        :class="{ 'bg-indigo-700': isSearchOrder }"
                        @click="chooseSearchService('order')"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-magnifying-glass"
                            class="text-red-500"
                        />
                        Tra cứu vận đơn
                    </span>
                    <!-- <span
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
					> -->
                </div>

                <!-- tra cứu vận đơn -->
                <transition name="element">
                    <div class="bg-indigo-400 p-4">
                        <div
                            class="flex w-full gap-2 text-xs md:text-sm lg:text-base"
                        >
                            <input
                                type="text"
                                placeholder="Mã vận đơn"
                                id="orderId"
                                class="basis-9/12 rounded-2xl p-2 lg:basis-11/12"
                                v-model="search_package_id"
                            />
                            <button
                                for="orderId"
                                class="search-btn w-full basis-3/12 rounded-md px-4 py-2 text-center font-bold text-white hover:cursor-pointer hover:opacity-80 lg:basis-1/12"
                                @click="handleSearchPackageProcess"
                                @keyup.enter="handleSearchPackageProcess"
                            >
                                <p class="w-full">Tra cứu</p>
                            </button>
                        </div>

                        <div
                            class="mt-4 flex flex-col gap-2 rounded-lg bg-white p-4 text-xs sm:text-sm md:text-base lg:text-lg"
                            v-if="package_process"
                        >
                            <span class="flex gap-2">
                                <h1 class="font-bold">Mã vận đơn:</h1>
                                <p class="">{{ package_process.package_id }}</p>
                            </span>
                            <span class="flex gap-2">
                                <h1 class="font-bold">Ngày tạo đơn:</h1>
                                <p class="">{{ package_process.createdAt }}</p>
                            </span>
                            <span class="flex gap-2">
                                <h1 class="font-bold">Trạng thái:</h1>
                                <p class="">{{ package_process.status }}</p>
                            </span>
                            <span class="flex flex-col">
                                <h1 class="font-bold">
                                    Theo dõi quá trình đơn hàng:
                                </h1>
                                <div>
                                    <span
                                        v-for="(
                                            process, index
                                        ) in package_process.process"
                                        :key="index"
                                        class="flex gap-4"
                                    >
                                        <h2 class="italic text-red-500">
                                            {{ process.time }}
                                        </h2>
                                        <p>
                                            {{ process.status }}
                                        </p>
                                    </span>
                                </div>
                            </span>

                            <router-link
                                class="rounded-lg bg-indigo-400 px-2 py-1 font-bold text-white hover:cursor-pointer hover:bg-indigo-500 max-w-fit"
                                :to="'/package/detail/' + package_process.package_id"
                            >
                                Xem chi tiết
                            </router-link>
                        </div>
                    </div>
                </transition>

                <!-- ước tính cước phí -->
                <!-- <transition name="element">
					<div class="bg-indigo-400 p-4 flex flex-col gap-8" v-if="isSearchFee">
						<div class="grid grid-cols-2 gap-4">
							<span class="flex flex-col gap-1">
								<span class="flex gap-4 items-center">
									<label for="sent-province" class="font-bold text-yellow-200"
										>Tỉnh/Thành phố gửi</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="sentProvince.errorMessage"
										>{{ sentProvince.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="sent-province"
									v-model="sentProvince.value"
									@change="handleSentProvinceChange"
								>
									<option value="Tỉnh/Thành phố gửi">Tỉnh/Thành phố gửi</option>
									<option
										v-for="province in sentProvinces"
										:value="province.name"
									>
										{{ province.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex gap-4 items-center">
									<label
										for="receive-province"
										class="font-bold text-yellow-200"
										>Tỉnh/Thành phố nhận</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="receiveProvince.errorMessage"
										>{{ receiveProvince.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="receive-province"
									v-model="receiveProvince.value"
									@change="handleReceiveProvinceChange"
								>
									<option value="Tỉnh/Thành phố nhận">
										Tỉnh/Thành phố nhận
									</option>
									<option
										v-for="province in receiveProvinces"
										:value="province.name"
									>
										{{ province.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex gap-4 items-center">
									<label for="sent-district" class="font-bold text-yellow-200"
										>Quận/Huyện gửi</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="sentDistrict.errorMessage"
										>{{ sentDistrict.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="sent-district"
									v-model="sentDistrict.value"
									@change="handleSentDistrictChange"
								>
									<option value="Quận/Huyện gửi">Quận/Huyện gửi</option>
									<option
										v-for="district in sentDistricts"
										:value="district.name"
									>
										{{ district.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex items-center gap-4">
									<label
										for="receive-district"
										class="font-bold text-yellow-200"
										>Quận/Huyện nhận</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="receiveDistrict.errorMessage"
										>{{ receiveDistrict.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="receive-district"
									v-model="receiveDistrict.value"
									@change="handleReceiveDistrictChange"
								>
									<option value="Quận/Huyện nhận">Quận/Huyện nhận</option>
									<option
										v-for="district in receiveDistricts"
										:value="district.name"
									>
										{{ district.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex items-center gap-4">
									<label for="sent-ward" class="font-bold text-yellow-200"
										>Phường/Xã gửi</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="sentWard.errorMessage"
										>{{ sentWard.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="sent-ward"
									v-model="sentWard.value"
									@change="sentWard.errorMessage = ''"
								>
									<option value="Phường/Xã gửi">Phường/Xã gửi</option>
									<option v-for="ward in sentWards" :value="ward.name">
										{{ ward.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex items-center gap-4">
									<label for="receive-ward" class="font-bold text-yellow-200"
										>Phường/Xã nhận</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="receiveWard.errorMessage"
										>{{ receiveWard.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="receive-ward"
									v-model="receiveWard.value"
									@change="receiveWard.errorMessage = ''"
								>
									<option value="Phường/Xã nhận">Phường/Xã nhận</option>
									<option v-for="ward in receiveWards" :value="ward.name">
										{{ ward.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex items-center gap-4">
									<label
										for="package-category"
										class="text-yellow-200 font-bold"
										>Loại hàng</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="packageCategory.errorMessage"
										>{{ packageCategory.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="package-category"
									v-model="packageCategory.value"
									@change="packageCategory.errorMessage = ''"
								>
									<option value="Loại hàng">Loại hàng</option>
									<option value="Tài liệu">Tài liệu</option>
									<option value="Hàng hóa">Hàng hóa</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex gap-4 items-center">
									<label for="package-weight" class="text-yellow-200 font-bold"
										>Khối lượng (kg)</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="packageWeight.errorMessage"
										>{{ packageWeight.errorMessage }}</span
									>
								</span>
								<input
									type="number"
									v-model="packageWeight.value"
									placeholder="Khối lượng"
									class="p-2 hover:cursor-pointer"
									id="package-weight"
									@input="packageWeight.errorMessage = ''"
								/>
							</span>
						</div>

						<button
							class="search-btn text-white px-4 py-2 text-center rounded-md font-bold text-2xl hover:cursor-pointer hover:opacity-80"
							@click="handleEstimateFee"
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
				</transition> -->

                <!-- tìm điểm giao dịch -->
                <!-- <transition name="element">
					<div
						class="bg-indigo-400 p-4 flex flex-col gap-8"
						v-if="isSearchTransaction"
					>
						<div class="flex flex-col gap-2 w-full">
							<span class="flex flex-col gap-1">
								<span class="flex gap-4 items-center">
									<label
										for="transaction-province"
										class="font-bold text-yellow-200"
										>Tỉnh/Thành phố</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="transactionProvince.errorMessage"
										>{{ transactionProvince.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="transaction-province"
									v-model="transactionProvince.value"
									@change="handleTransactionProvinceChange"
								>
									<option value="Tỉnh/Thành phố">Tỉnh/Thành phố</option>
									<option
										v-for="province in transactionProvinces"
										:value="province.name"
									>
										{{ province.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex gap-4 items-center">
									<label
										for="transaction-district"
										class="font-bold text-yellow-200"
										>Quận/Huyện</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="transactionDistrict.errorMessage"
										>{{ transactionDistrict.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="transaction-district"
									v-model="transactionDistrict.value"
									@change="handleTransactionDistrictChange"
								>
									<option value="Quận/Huyện">Quận/Huyện</option>
									<option
										v-for="district in transactionDistricts"
										:value="district.name"
									>
										{{ district.name }}
									</option>
								</select>
							</span>

							<span class="flex flex-col gap-1">
								<span class="flex items-center gap-4">
									<label
										for="transaction-ward"
										class="font-bold text-yellow-200"
										>Phường/Xã</label
									>
									<span
										class="text-red-700 italic text-sm"
										v-if="transactionWard.errorMessage"
										>{{ transactionWard.errorMessage }}</span
									>
								</span>
								<select
									class="p-2 hover:cursor-pointer"
									id="receive-ward"
									v-model="transactionWard.value"
									@change="transactionWard.errorMessage = ''"
								>
									<option value="Phường/Xã">Phường/Xã</option>
									<option v-for="ward in transactionWards" :value="ward.name">
										{{ ward.name }}
									</option>
								</select>
							</span>
							<button
								class="search-btn text-white mt-6 px-4 py-2 text-center rounded-md font-bold text-2xl hover:cursor-pointer hover:opacity-80"
								@click="handleTransaction"
							>
								Tra cứu
							</button>
						</div>
						<div
							class="bg-white mt-4 p-4 rounded-lg text-xs sm:text-sm md:text-base lg:text-lg"
						>
							<span class="flex gap-2">
								<h2 class="font-bold">Bưu cục Cầu Giấy:</h2>
								<p class="">20 - Ngõ 20 - Hồ Tùng Mậu</p>
							</span>
							<span class="flex gap-2">
								<h2 class="font-bold">Bưu cục Thanh Xuân:</h2>
								<p class="">2 - Ngõ 2 - xxx</p>
							</span>
						</div>
					</div>
				</transition> -->
            </div>
        </div>

        <!-- Phần show thông tin dịch vụ của công ty -->
        <div
            class="flex w-full flex-col items-center justify-center gap-8 pt-8 lg:gap-12 lg:pt-12 xl:gap-20 xl:pt-20"
            id="service-list"
        >
            <button
                class="rounded-full border-4 bg-indigo-700 px-6 py-2 text-base font-semibold text-white sm:text-lg md:px-8 md:py-2 md:text-xl lg:px-9 lg:py-3 lg:text-2xl xl:px-10 xl:py-4 xl:text-3xl"
            >
                Dịch vụ
            </button>

            <div
                class="grid items-center justify-center gap-4 px-2 lg:grid-cols-2 lg:gap-12 lg:px-28 xl:gap-20 xl:px-60"
            >
                <a
                    class="h-full w-full select-none content-between rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100"
                >
                    <div class="flex flex-row items-center gap-8">
                        <font-awesome-icon
                            class="content-center"
                            icon="fa-solid fa-truck-fast"
                        />
                        <h5
                            class="mb-2 w-full text-sm font-bold tracking-tight text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        >
                            Chuyển phát nhanh
                        </h5>
                    </div>
                    <p
                        class="text-xs font-normal text-gray-700 md:text-sm lg:text-base"
                    >
                        Dịch vụ nhận gửi, vận chuyển và phát các loại thư, tài
                        liệu, thư từ trong nước theo chỉ tiêu thời gian tiêu
                        chuẩn, Không áp dụng với các đơn hàng có thu hộ COD [..]
                    </p>
                </a>

                <a
                    class="h-full w-full select-none content-between rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100"
                >
                    <div class="flex flex-row items-center gap-8">
                        <font-awesome-icon icon="fa-solid fa-truck-fast" />
                        <h5
                            class="mb-2 text-sm font-bold tracking-tight text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        >
                            Chuyển phát hỏa tốc
                        </h5>
                    </div>
                    <p
                        class="text-xs font-normal text-gray-700 md:text-sm lg:text-base"
                    >
                        Dịch vụ nhận gửi, vận chuyển và phát nhanh chứng từ hàng
                        hóa, vật phẩm có độ ưu tiên cao nhất với chỉ tiêu thời
                        gian toàn trình không quá 24 giờ [...]
                    </p>
                </a>
                <a
                    class="h-full w-full select-none content-between rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100"
                >
                    <div class="flex flex-row items-center gap-8">
                        <font-awesome-icon icon="fa-solid fa-truck-fast" />
                        <h5
                            class="mb-2 text-sm font-bold tracking-tight text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        >
                            Chuyển phát tiết kiệm
                        </h5>
                    </div>
                    <p
                        class="text-xs font-normal text-gray-700 md:text-sm lg:text-base"
                    >
                        Dịch vụ nhận gửi, vận chuyển và phát các loại hàng hóa,
                        bưu kiện không giới hạn mức trọng lượng, theo chỉ tiêu
                        thời gian tiêu chuẩn, giá cước hợp lý [...]
                    </p>
                </a>

                <a
                    class="h-full w-full select-none content-between rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100"
                >
                    <div class="flex flex-row items-center gap-8">
                        <font-awesome-icon icon="fa-solid fa-truck-fast" />
                        <h5
                            class="mb-2 text-sm font-bold tracking-tight text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        >
                            Chuyển phát đặc biệt
                        </h5>
                    </div>
                    <p
                        class="text-xs font-normal text-gray-700 md:text-sm lg:text-base"
                    >
                        Dịch vụ nhận gửi, vận chuyển và phát các loại hàng hóa
                        đặc biệt, quá trình tiếp nhận, đóng gói, quy định về tem
                        nhãn cảnh báo riêng cho từng loại [...]
                    </p>
                </a>
            </div>
        </div>

        <!-- Thống kê khách hàng và số lượng hàng hóa  -->
        <div
            class="flex w-full flex-col items-center justify-center gap-8 pt-8 lg:gap-12 lg:pt-12 xl:gap-20 xl:pt-20"
        >
            <button
                class="rounded-full border-4 bg-indigo-700 px-6 py-2 text-base font-semibold text-white sm:text-lg md:px-8 md:py-2 md:text-xl lg:px-9 lg:py-3 lg:text-2xl xl:px-10 xl:py-4 xl:text-3xl"
            >
                Khách hàng của chúng tôi
            </button>
            <div class="grid w-full lg:grid-cols-3">
                <div
                    class="w-full bg-indigo-400 p-10 text-center text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl"
                >
                    Mạng lưới bưu cục 63 tỉnh thành trên cả nước
                </div>

                <div
                    class="flex items-center gap-4 border-y-2 border-black bg-green-200 p-10 sm:text-xl md:text-2xl lg:border-none lg:text-2xl"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-users"
                        class="text-2xl sm:text-3xl md:text-4xl lg:text-4xl"
                    />
                    <span class="flex flex-col gap-2">
                        <h1>990.870+</h1>
                        <p>KHÁCH HÀNG TIN DÙNG</p>
                    </span>
                </div>

                <div
                    class="flex items-center gap-4 bg-green-200 p-10 sm:text-xl md:text-2xl lg:text-2xl"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-box-open"
                        class="text-2xl sm:text-3xl md:text-4xl lg:text-4xl"
                    />
                    <span class="flex flex-col gap-2">
                        <h1>483.870+</h1>
                        <p>ĐƠN HÀNG ĐANG VẬN CHUYỂN</p>
                    </span>
                </div>
            </div>
        </div>

        <!-- Giới thiệu đội ngũ -->
        <div
            class="flex w-full flex-col items-center justify-center gap-8 py-8 lg:gap-12 lg:pt-12 xl:gap-20 xl:pt-20"
        >
            <button
                class="rounded-full border-4 bg-indigo-700 px-6 py-2 text-base font-semibold text-white sm:text-lg md:px-8 md:py-2 md:text-xl lg:px-9 lg:py-3 lg:text-2xl xl:px-10 xl:py-4 xl:text-3xl"
            >
                Đội ngũ của chúng tôi
            </button>
            <div class="grid gap-16 px-2 lg:grid-cols-3">
                <div
                    class="max-w-sm rounded-lg border border-gray-200 bg-white shadow"
                >
                    <img
                        class="w-{16px} h-{16px} rounded-t-lg"
                        src="../../src/assets/images/logo_magicpost.jpg"
                        alt=""
                    />
                    <div class="p-5">
                        <h5
                            class="mb-2 text-sm font-bold tracking-tight text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        >
                            Nguyen Duc Thien
                        </h5>
                        <p
                            class="mb-3 text-xs font-normal text-gray-700 md:text-sm lg:text-base"
                        >
                            Chairman of directors
                        </p>
                    </div>
                </div>
                <div
                    class="max-w-sm rounded-lg border border-gray-200 bg-white shadow"
                >
                    <img
                        class="rounded-t-lg"
                        src="../../src/assets/images/logo_magicpost.jpg"
                        alt=""
                    />
                    <div class="p-5">
                        <h5
                            class="mb-2 text-sm font-bold tracking-tight text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        >
                            To Lam Son
                        </h5>
                        <p
                            class="mb-3 text-xs font-normal text-gray-700 md:text-sm lg:text-base"
                        >
                            Chief Executive Officer
                        </p>
                    </div>
                </div>
                <div
                    class="max-w-sm rounded-lg border border-gray-200 bg-white shadow"
                >
                    <img
                        class="rounded-t-lg"
                        src="../../src/assets/images/logo_magicpost.jpg"
                        alt=""
                    />
                    <div class="p-5">
                        <h5
                            class="mb-2 text-sm font-bold tracking-tight text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                        >
                            Ta Khanh Phuong
                        </h5>
                        <p
                            class="mb-3 text-xs font-normal text-gray-700 md:text-sm lg:text-base"
                        >
                            Director of Development
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <base-dialog
            :show="!!error"
            title="Có lỗi xảy ra!"
            @close="error = null"
            @exit="error = null"
        >
            <p>{{ error }}</p>
        </base-dialog>
    </main>
</template>

<script>
export default {
    data() {
        return {
            // data của dữ tra cứu vận đơn
            // isSearchOrder: true,
            // isSearchFee: false,
            // isSearchTransaction: false,
            //data của ước tính cước phí
            // sentProvinces: [],
            // receiveProvinces: [],
            // sentDistricts: [],
            // receiveDistricts: [],
            // sentWards: [],
            // receiveWards: [],
            // sentProvince: {
            //     value: "Tỉnh/Thành phố gửi",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // receiveProvince: {
            //     value: "Tỉnh/Thành phố nhận",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // sentDistrict: {
            //     value: "Quận/Huyện gửi",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // receiveDistrict: {
            //     value: "Quận/Huyện nhận",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // sentWard: {
            //     value: "Phường/Xã gửi",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // receiveWard: {
            //     value: "Phường/Xã nhận",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // packageCategory: {
            //     value: "Loại hàng",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // packageWeight: { value: null, isValid: true, errorMessage: "" },
            //data của tìm điểm giao dịch
            // transactionProvinces: [],
            // transactionDistricts: [],
            // transactionWards: [],
            // transactionProvince: {
            //     value: "Tỉnh/Thành phố",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // transactionDistrict: {
            //     value: "Quận/Huyện",
            //     isValid: true,
            //     errorMessage: "",
            // },
            // transactionWard: {
            //     value: "Phường/Xã",
            //     isValid: true,
            //     errorMessage: "",
            // },

            // phần tra cứu vận đơn
            search_package_id: null,
            isLoading: false,
            error: null,
            package_process: null,
        };
    },
    methods: {
        //method chuyển các mục trong tra cứu
        // chooseService(type) {
        //     switch (type) {
        //         case "search":
        //             this.isSearch = true;
        //             this.isService = false;
        //             break;
        //         case "service":
        //             this.isSearch = false;
        //             this.isService = true;
        //             break;
        //     }
        // },
        // chooseSearchService(type) {
        //     switch (type) {
        //         case "order":
        //             this.isSearchOrder = true;
        //             this.isSearchFee = false;
        //             this.isSearchTransaction = false;
        //             break;
        //         case "fee":
        //             this.isSearchOrder = false;
        //             this.isSearchFee = true;
        //             this.isSearchTransaction = false;
        //             break;
        //         case "transaction":
        //             this.isSearchOrder = false;
        //             this.isSearchFee = false;
        //             this.isSearchTransaction = true;
        //             break;
        //     }
        // },
        //method xử lí phần ước tính cước phí
        // async setEstimateProvinces() {
        //     await this.$store.dispatch("address/getProvinces");
        //     this.sentProvinces = this.$store.getters["address/getProvinces"];
        //     this.receiveProvinces = this.$store.getters["address/getProvinces"];
        // },
        // async handleSentProvinceChange() {
        //     this.sentProvince.errorMessage = "";
        //     this.sentDistricts = [];
        //     this.sentDistrict.value = "Quận/Huyện gửi";
        //     this.sentWards = [];
        //     this.sentWard.value = "Phường/Xã gửi";
        //     let provinceCode = "";
        //     for (let province of this.sentProvinces) {
        //         if (province.name === this.sentProvince.value) {
        //             provinceCode = province.code;
        //             break;
        //         }
        //     }
        //     const districts = this.$store.getters["address/getDistricts"];
        //     for (const district in districts) {
        //         if (districts[district].province_code === provinceCode) {
        //             this.sentDistricts.push(districts[district]);
        //         }
        //     }
        // },
        // async handleReceiveProvinceChange() {
        //     this.receiveProvince.errorMessage = "";
        //     this.receiveDistricts = [];
        //     this.receiveDistrict.value = "Quận/Huyện nhận";
        //     this.receiveWards = [];
        //     this.receiveWard.value = "Phường/Xã nhận";
        //     let provinceCode = "";
        //     for (let province of this.receiveProvinces) {
        //         if (province.name === this.receiveProvince.value) {
        //             provinceCode = province.code;
        //             break;
        //         }
        //     }
        //     const districts = this.$store.getters["address/getDistricts"];
        //     for (const district in districts) {
        //         if (districts[district].province_code === provinceCode) {
        //             this.receiveDistricts.push(districts[district]);
        //         }
        //     }
        // },
        // async handleSentDistrictChange() {
        //     this.sentDistrict.errorMessage = "";
        //     this.sentWards = [];
        //     this.sentWard.value = "Phường/Xã gửi";
        //     let districtCode = "";
        //     for (let district of this.sentDistricts) {
        //         if (district.name === this.sentDistrict.value) {
        //             districtCode = district.code;
        //             break;
        //         }
        //     }
        //     const wards = this.$store.getters["address/getWards"];
        //     for (const ward in wards) {
        //         if (wards[ward].district_code === districtCode) {
        //             this.sentWards.push(wards[ward]);
        //         }
        //     }
        // },
        // async handleReceiveDistrictChange() {
        //     this.receiveDistrict.errorMessage = "";
        //     this.receiveWards = [];
        //     this.receiveWard.value = "Phường/Xã nhận";
        //     let districtCode = "";
        //     for (let district of this.receiveDistricts) {
        //         if (district.name === this.receiveDistrict.value) {
        //             districtCode = district.code;
        //             break;
        //         }
        //     }
        //     const wards = this.$store.getters["address/getWards"];
        //     for (const ward in wards) {
        //         if (wards[ward].district_code === districtCode) {
        //             this.receiveWards.push(wards[ward]);
        //         }
        //     }
        // },
        // handleEstimateFee() {
        //     if (this.validateEstimateForm) {
        //         const formData = {
        //             sentProvince: this.sentProvince.value,
        //             receiveProvince: this.receiveProvince.value,
        //             sentDistrict: this.sentDistrict.value,
        //             receiveDistrict: this.receiveDistrict.value,
        //             sentWard: this.sentWard.value,
        //             receiveWard: this.receiveWard.value,
        //             packageCategory: this.packageCategory.value,
        //             packageWeight: this.packageWeight.value,
        //         };
        //         console.log(formData);
        //         this.resetEstimateFeeForm();
        //     } else {
        //         console.log("invalid form");
        //         return;
        //     }
        // },
        // resetEstimateFeeForm() {
        //     this.sentProvince.value = "Tỉnh/Thành phố gửi";
        //     this.receiveProvince.value = "Tỉnh/Thành phố nhận";
        //     this.sentDistrict.value = "Quận/Huyện gửi";
        //     this.receiveDistrict.value = "Quận/Huyện nhận";
        //     this.sentWard.value = "Phường/Xã gửi";
        //     this.receiveWard.value = "Phường/Xã nhận";
        //     this.packageCategory.value = "Loại hàng";
        //     this.packageWeight.value = null;
        //     this.sentProvince.isValid = true;
        //     this.receiveProvince.isValid = true;
        //     this.sentDistrict.isValid = true;
        //     this.receiveDistrict.isValid = true;
        //     this.sentWard.isValid = true;
        //     this.receiveWard.isValid = true;
        //     this.packageCategory.isValid = true;
        //     this.packageWeight.isValid = true;
        //     this.sentProvince.errorMessage = "";
        //     this.receiveProvince.errorMessage = "";
        //     this.sentDistrict.errorMessage = "";
        //     this.receiveDistrict.errorMessage = "";
        //     this.sentWard.errorMessage = "";
        //     this.receiveWard.errorMessage = "";
        //     this.packageCategory.errorMessage = "";
        //     this.packageWeight.errorMessage = "";
        // },
        //method xử lí phần tìm điểm giao dịch
        // async setTransactionProvinces() {
        //     await this.$store.dispatch("address/getProvinces");
        //     this.transactionProvinces =
        //         this.$store.getters["address/getProvinces"];
        // },
        // async handleTransactionProvinceChange() {
        //     this.transactionProvince.errorMessage = "";
        //     this.transactionDistricts = [];
        //     this.transactionDistrict.value = "Quận/Huyện";
        //     this.transactionWards = [];
        //     this.transactionWard.value = "Phường/Xã";
        //     let provinceCode = "";
        //     for (let province of this.transactionProvinces) {
        //         if (province.name === this.transactionProvince.value) {
        //             provinceCode = province.code;
        //             break;
        //         }
        //     }
        //     const districts = this.$store.getters["address/getDistricts"];
        //     for (const district in districts) {
        //         if (districts[district].province_code === provinceCode) {
        //             this.transactionDistricts.push(districts[district]);
        //         }
        //     }
        // },
        // async handleTransactionDistrictChange() {
        //     this.transactionDistrict.errorMessage = "";
        //     this.transactionWards = [];
        //     this.transactionWard.value = "Phường/Xã";
        //     let districtCode = "";
        //     for (let district of this.transactionDistricts) {
        //         if (district.name === this.transactionDistrict.value) {
        //             districtCode = district.code;
        //             break;
        //         }
        //     }
        //     const wards = this.$store.getters["address/getWards"];
        //     for (const ward in wards) {
        //         if (wards[ward].district_code === districtCode) {
        //             this.transactionWards.push(wards[ward]);
        //         }
        //     }
        // },
        // handleTransaction() {
        //     if (this.validateTransactionForm) {
        //         const formData = {
        //             transactionProvince: this.transactionProvince.value,
        //             transactionDistrict: this.transactionDistrict.value,
        //             transactionWard: this.transactionWard.value,
        //         };
        //         console.log(formData);
        //         this.resetTransactionForm();
        //     } else {
        //         console.log("invalid form");
        //         return;
        //     }
        // },
        // resetTransactionForm() {
        //     this.transactionProvince.value = "Tỉnh/Thành phố";
        //     this.transactionDistrict.value = "Quận/Huyện";
        //     this.transactionWard.value = "Phường/Xã";
        //     this.transactionProvince.isValid = true;
        //     this.transactionDistrict.isValid = true;
        //     this.transactionWard.isValid = true;
        //     this.transactionProvince.errorMessage = "";
        //     this.transactionDistrict.errorMessage = "";
        //     this.transactionWard.errorMessage = "";
        // },

        // phần tra cứu vận đơn
        async handleSearchPackageProcess() {
            if (
                this.search_package_id === null ||
                this.search_package_id.trim() == ""
            ) {
                alert("Vui lòng nhập mã vận đơn");
                return;
            }
            try {
                this.isLoading = true;
                this.package_process = await this.$store.dispatch(
                    "package/getPackageProcess",
                    Number(this.search_package_id),
                );
                this.isLoading = false;

                console.log(this.package_process);
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
    },
    computed: {
        //computed của ước tính cước phí
        // validateEstimateForm() {
        //     let isValid = true;
        //     if (this.sentProvince.value === "Tỉnh/Thành phố gửi") {
        //         this.sentProvince.isValid = false;
        //         this.sentProvince.errorMessage =
        //             "Vui lòng chọn tỉnh/thành phố gửi";
        //         isValid = false;
        //     } else {
        //         this.sentProvince.isValid = true;
        //         this.sentProvince.errorMessage = "";
        //     }
        //     if (this.receiveProvince.value === "Tỉnh/Thành phố nhận") {
        //         this.receiveProvince.isValid = false;
        //         this.receiveProvince.errorMessage =
        //             "Vui lòng chọn tỉnh/thành phố nhận";
        //         isValid = false;
        //     } else {
        //         this.receiveProvince.isValid = true;
        //         this.receiveProvince.errorMessage = "";
        //     }
        //     if (this.sentDistrict.value === "Quận/Huyện gửi") {
        //         this.sentDistrict.isValid = false;
        //         this.sentDistrict.errorMessage = "Vui lòng chọn quận/huyện gửi";
        //         isValid = false;
        //     } else {
        //         this.sentDistrict.isValid = true;
        //         this.sentDistrict.errorMessage = "";
        //     }
        //     if (this.receiveDistrict.value === "Quận/Huyện nhận") {
        //         this.receiveDistrict.isValid = false;
        //         this.receiveDistrict.errorMessage =
        //             "Vui lòng chọn quận/huyện nhận";
        //         isValid = false;
        //     } else {
        //         this.receiveDistrict.isValid = true;
        //         this.receiveDistrict.errorMessage = "";
        //     }
        //     if (this.sentWard.value === "Phường/Xã gửi") {
        //         this.sentWard.isValid = false;
        //         this.sentWard.errorMessage = "Vui lòng chọn phường/xã gửi";
        //         isValid = false;
        //     } else {
        //         this.sentWard.isValid = true;
        //         this.sentWard.errorMessage = "";
        //     }
        //     if (this.receiveWard.value === "Phường/Xã nhận") {
        //         this.receiveWard.isValid = false;
        //         this.receiveWard.errorMessage = "Vui lòng chọn phường/xã nhận";
        //         isValid = false;
        //     } else {
        //         this.receiveWard.isValid = true;
        //         this.receiveWard.errorMessage = "";
        //     }
        //     if (this.packageCategory.value === "Loại hàng") {
        //         this.packageCategory.isValid = false;
        //         this.packageCategory.errorMessage =
        //             "Vui lòng chọn loại hàng hóa";
        //         isValid = false;
        //     } else {
        //         this.packageCategory.isValid = true;
        //         this.packageCategory.errorMessage = "";
        //     }
        //     if (this.packageWeight.value === null) {
        //         this.packageWeight.isValid = false;
        //         this.packageWeight.errorMessage =
        //             "Vui lòng nhập khối lượng hàng hóa";
        //         isValid = false;
        //     } else {
        //         this.packageWeight.isValid = true;
        //         this.packageWeight.errorMessage = "";
        //     }
        //     return isValid;
        // },
        //computed của tìm điểm giao dịch
        // validateTransactionForm() {
        //     let isValid = true;
        //     if (this.transactionProvince.value === "Tỉnh/Thành phố") {
        //         this.transactionProvince.isValid = false;
        //         this.transactionProvince.errorMessage =
        //             "Vui lòng chọn tỉnh/thành phố";
        //         isValid = false;
        //     } else {
        //         this.transactionProvince.isValid = true;
        //         this.transactionProvince.errorMessage = "";
        //     }
        //     return isValid;
        // },
    },
    mounted() {
        //call api lấy dữ liệu các tỉnh/huyện/xã
        // this.setEstimateProvinces();
        // this.setTransactionProvinces();
        // this.$store.dispatch("address/getDistricts");
        // this.$store.dispatch("address/getWards");
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
    transition: all 0.3s ease-out;
}

.search-btn {
    background-color: #303030;
}
</style>
