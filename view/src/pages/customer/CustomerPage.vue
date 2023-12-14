<template>
	<main class="flex">
		<!-- Side bar  -->
		<div
			class="basis-1/4 w-full min-h-screen pt-20 p-10 bg-white flex flex-col gap-16"
		>
			<!-- Giới thiệu thông tin  -->
			<div class="flex items-center gap-4 p-4 rounded">
				<img
					src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
					alt="user logo"
					class="h-14 w-14 rounded-full"
				/>
				<span class="text-sm sm:text-base md:text-lg lg:text-xl">
					<h1
						class="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold"
					>
						Nguyễn Đức Thiện
					</h1>
					<h1 class="text-base sm:text-lg md:text-xl lg:text-2xl text-black">
						Customer ID: 1
					</h1>
				</span>
			</div>

			<!-- List các danh mục  -->
			<div class="flex flex-col gap-10">
				<!-- Quản lý hệ thống  -->
				<div class="flex flex-col gap-2">
					<div
						class="flex justify-between items-center text-xs sm:text-sm md:text-base lg:text-lg px-4 py-2 text-white font-semibold bg-indigo-400 hover:cursor-pointer hover:bg-indigo-500"
					>
						<font-awesome-icon
							icon="fa-solid fa-bars"
							class="text-sm sm:text-base md:text-xl lg:text-2xl select-none"
						/>
						<h1 class="select-none">Lịch sử đơn hàng</h1>
						<font-awesome-icon icon="fa-solid fa-chevron-right" />
					</div>
				</div>
			</div>
		</div>

		<router-view v-slot="slotProps">
			<transition name="route" mode="out-in">
				<component :is="slotProps.Component"></component>
			</transition>
		</router-view>
	</main>
</template>
