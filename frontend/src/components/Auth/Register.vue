<template>
	<v-app>
		<v-card width="400" class="mx-auto my-15">
			<v-card-text>
				<v-form v-model="valid">
					<v-text-field
						v-model="userInfo.username"
						label="Username"
						prepend-icon="mdi-account-circle"
					/>
					<v-text-field
						v-model="userInfo.email"
						label="Email"
						prepend-icon="mdi-account-circle"
					/>
					<v-text-field
						v-model="userInfo.password"
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					/>
				</v-form>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer />
				<v-btn color="info" :disabled="!valid" @click="submitForm">
					Inscription</v-btn
				>
				<v-spacer />
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			valid: false,
			showPassword: false,
			userInfo: {
				username: "",
				email: "",
				password: "",
			},
		};
	},
	methods: {
		submitForm() {
			axios
				.post("http://localhost:3000/api/users/register", this.userInfo)
				.then(() => {
					this.$store.dispatch("setSnackbar", {
						showing: true,
						text: `Vous êtes inscrit! Bienvenue.`,
					});
					this.$router.push("login");
				});
		},
	},
};
</script>
