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
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						STT
					</th>
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Mã vận đơn
					</th>
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Hoạt động
					</th>
				</tr>

				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">1</td>
					<td class="border-e-2 border-blue-300 text-center">DP12345678</td>
					<td
						class="border-e-2 border-blue-300 text-center hover:underline hover:cursor-pointer hover:text-sky-800"
					>
						<router-link to="/customer/transaction/list"
							>Xem chi tiết</router-link
						>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">2</td>
					<td class="border-e-2 border-blue-300 text-center">DP12345678</td>
					<td
						class="border-e-2 border-blue-300 text-center hover:underline hover:cursor-pointer hover:text-sky-800"
					>
						<router-link to="/customer/transaction/list"
							>Xem chi tiết</router-link
						>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">3</td>
					<td class="border-e-2 border-blue-300 text-center">DP12345678</td>
					<td
						class="border-e-2 border-blue-300 text-center hover:underline hover:cursor-pointer hover:text-sky-800"
					>
						<router-link to="/customer/transaction/list"
							>Xem chi tiết</router-link
						>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">4</td>
					<td class="border-e-2 border-blue-300 text-center">DP12345678</td>
					<td
						class="border-e-2 border-blue-300 text-center hover:underline hover:cursor-pointer hover:text-sky-800"
					>
						<router-link to="/customer/transaction/list"
							>Xem chi tiết</router-link
						>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">5</td>
					<td class="border-e-2 border-blue-300 text-center">DP12345678</td>
					<td
						class="border-e-2 border-blue-300 text-center hover:underline hover:cursor-pointer hover:text-sky-800"
					>
						<router-link to="/customer/transaction/list"
							>Xem chi tiết</router-link
						>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">6</td>
					<td class="border-e-2 border-blue-300 text-center">DP12345678</td>
					<td
						class="border-e-2 border-blue-300 text-center hover:underline hover:cursor-pointer hover:text-sky-800"
					>
						<router-link to="/customer/transaction/list"
							>Xem chi tiết</router-link
						>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">7</td>
					<td class="border-e-2 border-blue-300 text-center">DP12345678</td>
					<td
						class="border-e-2 border-blue-300 text-center hover:underline hover:cursor-pointer hover:text-sky-800"
					>
						<router-link to="/customer/transaction/list"
							>Xem chi tiết</router-link
						>
					</td>
				</tr>
			</table>
			<div class="grid grid-cols-5 gap-2 w-full px-1 items-center">
				<button
					class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
				>
					<font-awesome-icon icon="fa-solid fa-chevron-left" />
				</button>
				<button
					class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
				>
					1
				</button>
				<button
					class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
				>
					2
				</button>
				<button
					class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
				>
					3
				</button>
				<button
					class="px-4 py-1 rounded bg-indigo-300 hover:cursor-pointer hover:bg-indigo-400"
				>
					<font-awesome-icon icon="fa-solid fa-chevron-right" />
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		transactionList() {
			return "/customer/transaction/list";
		},
	},
};
</script>
