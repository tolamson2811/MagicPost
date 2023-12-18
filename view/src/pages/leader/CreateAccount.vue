<template>
	<div
		class="basis-3/4 w-full mt-16 lg:mt-20 bg-gray-100 flex justify-center items-center"
	>
		<section
			class="w-1/2 px-10 py-4 bg-indigo-400 rounded-xl flex flex-col items-center gap-4"
		>
			<h1
				class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold select-none"
			>
				Tạo tài khoản
			</h1>
			<form class="flex flex-col gap-2 w-full">
				<div class="flex flex-col gap-1">
					<label for="role" class="lg:text-base md:text-sm text-xs"
						>Vai trò</label
					>
					<select
						name="role"
						id="role"
						class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
						v-model="role.value"
					>
						<option value="Trưởng điểm tập kết">Trưởng điểm tập kết</option>
					</select>
				</div>

				<div class="flex flex-col gap-1">
					<span class="flex items-center gap-2">
						<label for="location" class="lg:text-base md:text-sm text-xs"
							>Địa điểm làm việc</label
						>
						<span
							class="lg:text-sm text-xs text-yellow-300"
							v-if="!selectedProvince.isValid || !selectedDistrict.isValid"
							>{{
								selectedProvince.errorMessage || selectedDistrict.errorMessage
							}}</span
						>
					</span>
					<div class="w-full grid grid-cols-2 gap-4">
						<select
							id="province"
							class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
							v-model="selectedProvince.value"
							@change="handleChangeProvince"
						>
							<option value="Tỉnh/Thành phố">Tỉnh/Thành phố</option>
							<option
								v-for="province in provinces"
								:value="province.name"
								:key="province.code"
							>
								{{ province.name }}
							</option>
						</select>

						<select
							id="district"
							class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
							v-if="role.value !== 'Trưởng điểm tập kết'"
							v-model="selectedDistrict.value"
							@change="selectedDistrict.errorMessage = ''"
						>
							<option value="Quận/Huyện">Quận/Huyện</option>
							<option
								v-for="district in districts"
								:value="district.name"
								:key="district.code"
							>
								{{ district.name }}
							</option>
						</select>
					</div>
				</div>

				<div class="flex flex-col gap-1">
					<span class="flex items-center gap-2">
						<label for="email" class="lg:text-base md:text-sm text-xs"
							>Email</label
						>
						<span
							class="lg:text-sm text-xs text-yellow-300"
							v-if="email.errorMessage"
							>{{ email.errorMessage }}</span
						>
					</span>
					<input
						type="text"
						id="email"
						class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
						@input="email.errorMessage = ''"
						v-model="email.value"
					/>
				</div>

				<div class="flex flex-col gap-1">
					<span class="flex items-center gap-2">
						<label for="password" class="lg:text-base md:text-sm text-xs"
							>Mật khẩu</label
						>
						<span
							class="lg:text-sm text-xs text-yellow-300"
							v-if="password.errorMessage"
						>
							{{ password.errorMessage }}</span
						>
					</span>
					<input
						type="password"
						id="password"
						class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
						@input="password.errorMessage = ''"
						v-model="password.value"
					/>
				</div>

				<div class="flex flex-col gap-1">
					<span class="flex items-center gap-2">
						<label
							for="confirm-password"
							class="lg:text-base md:text-sm text-xs"
							>Nhập lại mật khẩu</label
						>
						<span
							class="lg:text-sm text-xs text-yellow-300"
							v-if="confirmPassword.errorMessage"
							>{{ confirmPassword.errorMessage }}</span
						>
					</span>
					<input
						type="password"
						id="confirm-password"
						placeholder=""
						class="px-4 py-2 text-sm md:text-base lg:text-lg border outline-green-300 rounded"
						@input="confirmPassword.errorMessage = ''"
						v-model="confirmPassword.value"
					/>
				</div>

				<span
					class="bg-black px-4 py-2 lg:text-lg md:text-base sm:text-sm text-xs text-white font-bold rounded mt-4 hover:cursor-pointer hover:opacity-90 text-center"
					@click="handleSubmit"
				>
					Tạo tài khoản
				</span>
			</form>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			role: {
				value: "Trưởng điểm tập kết",
				isValid: true,
				errorMessage: "",
			},
			provinces: [],
			selectedProvince: {
				value: "Tỉnh/Thành phố",
				isValid: true,
				errorMessage: "",
			},
			districts: [],
			selectedDistrict: {
				value: "Quận/Huyện",
				isValid: true,
				errorMessage: "",
			},
			email: {
				value: "",
				isValid: true,
				errorMessage: "",
			},
			password: {
				value: "",
				isValid: true,
				errorMessage: "",
			},
			confirmPassword: {
				value: "",
				isValid: true,
				errorMessage: "",
			},
		};
	},
	methods: {
		async setProvince() {
			await this.$store.dispatch("address/getProvinces");
			this.provinces = this.$store.getters["address/getProvinces"];
		},
		async handleChangeProvince() {
			this.selectedProvince.errorMessage = "";

			this.districts = [];
			this.selectedDistrict.value = "Quận/Huyện";

			let provinceCode = "";
			for (let province of this.provinces) {
				if (province.name === this.selectedProvince.value) {
					provinceCode = province.code;
					break;
				}
			}

			const districts = this.$store.getters["address/getDistricts"];

			for (const district in districts) {
				if (districts[district].province_code === provinceCode) {
					this.districts.push(districts[district]);
				}
			}
		},
		handleSubmit() {
			console.log("submit");

			if (this.validateForm) {
				console.log("valid");
				const formData = {
					role: this.role.value,
					province: this.selectedProvince.value,
					district: this.selectedDistrict.value,
					email: this.email.value,
					password: this.password.value,
				};

				console.log(formData);

				this.resetForm();
			} else {
				console.log("invalid");
				return;
			}
		},
		resetForm() {
			this.role.value = "Trưởng điểm tập kết";
			this.selectedProvince.value = "Tỉnh/Thành phố";
			this.selectedDistrict.value = "Quận/Huyện";
			this.email.value = "";
			this.password.value = "";
			this.confirmPassword.value = "";

			this.role.isValid = true;
			this.selectedProvince.isValid = true;
			this.selectedDistrict.isValid = true;
			this.email.isValid = true;
			this.password.isValid = true;
			this.confirmPassword.isValid = true;

			this.role.errorMessage = "";
			this.selectedProvince.errorMessage = "";
			this.selectedDistrict.errorMessage = "";
			this.email.errorMessage = "";
			this.password.errorMessage = "";
			this.confirmPassword.errorMessage = "";
		},
	},
	computed: {
		validateForm() {
			let isValid = true;
			console.log("validate");

			if (this.role.value.trim() === "Trưởng điểm giao dịch") {
				if (this.selectedProvince.value.trim() === "Tỉnh/Thành phố") {
					this.selectedProvince.isValid = false;
					this.selectedProvince.errorMessage = "Vui lòng chọn tỉnh/thành phố";
					isValid = false;
				}

				if (this.selectedDistrict.value.trim() === "Quận/Huyện") {
					this.selectedDistrict.isValid = false;
					this.selectedDistrict.errorMessage = "Vui lòng chọn quận/huyện";
					isValid = false;
				}
			} else {
				if (this.selectedProvince.value.trim() === "Tỉnh/Thành phố") {
					this.selectedProvince.isValid = false;
					this.selectedProvince.errorMessage = "Vui lòng chọn tỉnh/thành phố";
					isValid = false;
				}
			}

			//validate email
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (this.email.value.trim() === "") {
				this.email.isValid = false;
				this.email.errorMessage = "Email không được để trống";
				isValid = false;
			} else if (!emailRegex.test(this.email.value)) {
				this.email.isValid = false;
				this.email.errorMessage = "Email không hợp lệ";
				isValid = false;
			} else {
				this.email.isValid = true;
			}

			//validate password
			if (this.password.value.trim() === "") {
				this.password.isValid = false;
				this.password.errorMessage = "Mật khẩu không được để trống";
				isValid = false;
			} else if (this.password.value.trim().length < 6) {
				this.password.isValid = false;
				this.password.errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
				isValid = false;
			} else {
				this.password.isValid = true;
			}

			//validate confirm password
			if (this.confirmPassword.value.trim() === "") {
				this.confirmPassword.isValid = false;
				this.confirmPassword.errorMessage = "Mật khẩu không được để trống";
				isValid = false;
			} else if (this.confirmPassword.value.trim().length < 6) {
				this.confirmPassword.isValid = false;
				this.confirmPassword.errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
				isValid = false;
			} else if (
				this.confirmPassword.value.trim() !== this.password.value.trim()
			) {
				this.confirmPassword.isValid = false;
				this.confirmPassword.errorMessage = "Mật khẩu không khớp";
				isValid = false;
			} else {
				this.confirmPassword.isValid = true;
			}

			return isValid;
		},
	},
	mounted() {
		this.setProvince();
		this.$store.dispatch("address/getDistricts");
	},
};
</script>
