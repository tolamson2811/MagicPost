<template>
	<div class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex items-center">
		<!-- tìm kiếm  -->
		<div class="basis-1/4 w-full h-full p-4 flex flex-col gap-4">
			<button
				class="bg-indigo-400 py-2 rounded-lg text-white lg:text-base md:text-sm text-xs hover:cursor-pointer hover:bg-indigo-500"
			>
				Đang giao (4)
			</button>

			<button
				class="bg-indigo-400 py-2 rounded-lg text-white lg:text-base md:text-sm text-xs hover:cursor-pointer hover:bg-indigo-500"
			>
				Đã giao (2)
			</button>
			<button
				class="bg-indigo-400 py-2 rounded-lg text-white lg:text-base md:text-sm text-xs hover:cursor-pointer hover:bg-indigo-500"
			>
				Đã hủy (1)
			</button>
		</div>

		<!-- list danh sách điểm giao dịch  -->
		<div
			class="basis-3/4 flex flex-col gap-4 p-4 justify-start items-start h-full w-full"
		>
			<table class="w-full">
				<tr class="">
					<th class="bg-indigo-500 border border-gray-200 px-4 py-1 text-white">
						STT
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
					<th class="bg-indigo-500 border px-4 py-1 text-white">Mã vận đơn</th>
					<th class="bg-indigo-500 border px-4 py-1 text-white">
						Hoạt động
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

				<tr class="bg-gray-200">
					<td class="text-center">1</td>
					<td class="text-center">DP12345678</td>
					<td class="text-center hover:underline hover:cursor-pointer">
						Xem chi tiết
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="text-center">2</td>
					<td class="text-center">DP12345678</td>
					<td class="text-center hover:underline hover:cursor-pointer">
						Xem chi tiết
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="text-center">3</td>
					<td class="text-center">DP12345678</td>
					<td class="text-center hover:underline hover:cursor-pointer">
						Xem chi tiết
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="text-center">4</td>
					<td class="text-center">DP12345678</td>
					<td class="text-center hover:underline hover:cursor-pointer">
						Xem chi tiết
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="text-center">5</td>
					<td class="text-center">DP12345678</td>
					<td class="text-center hover:underline hover:cursor-pointer">
						Xem chi tiết
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="text-center">6</td>
					<td class="text-center">DP12345678</td>
					<td class="text-center hover:underline hover:cursor-pointer">
						Xem chi tiết
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="text-center">7</td>
					<td class="text-center">DP12345678</td>
					<td class="text-center hover:underline hover:cursor-pointer">
						Xem chi tiết
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			idFilter: "default",
			totalPackageFilter: "default",
			totalInventoryFilter: "default",
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
		toggleTotalPackageFilter() {
			this.idFilter = "default";
			this.totalInventoryFilter = "default";
			if (this.totalPackageFilter === "default") {
				this.totalPackageFilter = "increase";
			} else if (this.totalPackageFilter === "increase") {
				this.totalPackageFilter = "decrease";
			} else {
				this.totalPackageFilter = "default";
			}
		},
		toggleTotalInventoryFilter() {
			this.idFilter = "default";
			this.totalPackageFilter = "default";
			if (this.totalInventoryFilter === "default") {
				this.totalInventoryFilter = "increase";
			} else if (this.totalInventoryFilter === "increase") {
				this.totalInventoryFilter = "decrease";
			} else {
				this.totalInventoryFilter = "default";
			}
		},
	},
};
</script>
