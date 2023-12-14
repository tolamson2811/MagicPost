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
		<div
			class="basis-3/4 flex flex-col gap-4 p-4 justify-start items-start h-full w-full"
		>
			<table class="w-full">
				<tr class="">
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Thông tin gói hàng
					</th>
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Thông tin chi tiết
					</th>
				</tr>

				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Mã vận đơn</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>MD12345678</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Loại hàng</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>Hàng hóa</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Ngày tạo</td>
					<td class="border-e-2 border-blue-300 text-center">
						<input type="date" name="" id="" />
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Chi phí</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>500.000 VND</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Khối lượng</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>2kg</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">
						Trạng thái đơn hàng
					</td>
					<td class="border-e-2 border-blue-300 text-center">
						<select
							name="deliverydate"
							id="deliverydate"
							class="text-black px-4 py-2 text-sm md:text-base lg:text-lg border outline-blue-300 rounded"
						>
							<option value="Ngày giao"></option>
							<option value="Dự kiến ngày giao"></option>
							<option value="Ngày hủy"></option>
						</select>
					</td>
				</tr>
			</table>
			<table class="w-full">
				<tr class="">
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Thông tin người gửi
					</th>
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Thông tin chi tiết
					</th>
				</tr>

				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Họ và tên</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>Nguyễn Văn A</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Địa chỉ</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>Đan Phượng, Hà Nội</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Số điện thoại</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>012345678</h1>
					</td>
				</tr>
			</table>
			<table class="w-full">
				<tr class="">
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Thông tin người nhận
					</th>
					<th
						class="bg-indigo-500 border border-e-2 border-blue-300 px-4 py-1 text-white"
					>
						Thông tin chi tiết
					</th>
				</tr>

				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Họ và tên</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>Nguyễn Văn B</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Địa chỉ</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>Mỹ Đình, Hà Nội</h1>
					</td>
				</tr>
				<tr class="bg-gray-200">
					<td class="border-e-2 border-blue-300 text-center">Số điện thoại</td>
					<td class="border-e-2 border-blue-300 text-center">
						<h1>023456789</h1>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
