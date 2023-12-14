<template>
	<main class="w-3/12">
		<div
			class="mt-20 h-full py-8 px-4 pl-20 pr-20 flex flex-col gap-6 items-center bg-white lg:basis-2/5 xl:basis-1/5 w-2/10"
		>
			<div class="flex flex-col justify-center items-left gap-2">
				<img
					src="https://www.topcv.vn/images/avatar-default.jpg"
					alt="avt"
					class="w-32 h-32 rounded-full"
				/>
				<h2 class="text-sm md:text-base lg:text-lg font-bold text-sky-900">
					Nguyen Duc Thien
				</h2>
				<p class="text-xs md:text-sm lg:text-base text-slate-500">
					CustomerID: 1
				</p>
			</div>

			<div>
				<div class="flex flex-col items-center">
					<base-list
						title="Lịch sử đơn hàng"
						icon="fa-solid fa-palette"
					></base-list>
					<base-list
						title="Tra cứu thông tin đơn hàng"
						icon="fa-solid fa-palette"
					></base-list>
				</div>
			</div>
		</div>
	</main>
</template>
