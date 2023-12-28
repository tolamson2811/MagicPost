<template>
	<main
		class="pt-16 lg:pt-20 w-full four_zero_four_bg flex flex-col justify-end items-center gap-4"
	>
		<h1 class="text-5xl mb-14 text-sky-900">Trang không tồn tại</h1>
		<router-link
			to="/homepage"
			class="text-2xl py-2 px-4 rounded-xl bg-green-400 text-sky-900 font-bold hover:cursor-pointer hover:bg-green-500 hover:text-sky-950 mb-10"
			>Quay về trang chủ</router-link
		>
	</main>
</template>

<style scoped>
.four_zero_four_bg {
	background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
	height: 800px;
	background-position: center;
	width: 100%;
}
</style>
