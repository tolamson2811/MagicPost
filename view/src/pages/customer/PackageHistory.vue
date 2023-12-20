<template>
	<main class="flex">
		<!-- Side bar  -->
		<div
			class="basis-1/4 w-full min-h-screen pt-20 p-10 bg-blue-100 flex flex-col gap-16"
		>
			<!-- Giới thiệu thông tin  -->
			<div class="flex items-center gap-4 p-4 rounded">
				<img
					src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
					alt="user logo"
					class="h-14 w-14 rounded-full"
				/>
				<span class="text-sm sm:text-base md:text-lg lg:text-xl">
					<p>{{ userEmail }}</p>
					<h1
						class="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold"
					>
						ID khách hàng: {{ userId }}
					</h1>
				</span>
			</div>

			<!-- tìm kiếm  -->
			<div class="basis-1/4 w-full h-full p-4 flex flex-col gap-4">
				<button
					class="bg-indigo-400 py-2 rounded-lg text-white lg:text-base md:text-sm text-xs hover:cursor-pointer hover:bg-indigo-500"
				>
					Tất cả (7)
				</button>

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
		</div>

		<router-view v-slot="slotProps">
			<transition name="route" mode="out-in">
				<component :is="slotProps.Component"></component>
			</transition>
		</router-view>
	</main>
</template>

<script>
export default {
	computed: {
		userEmail() {
			return this.$store.getters.getUserEmail;
		},
		userId() {
			return this.$store.getters.getUserId;
		},
	},
};
</script>
