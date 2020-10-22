<template>
	<v-app class="blue-grey lighten-5">
		<v-card width="400" class="mx-auto mt-15">
			<v-card-text>
				<v-form v-model="valid" ref="form">
					<v-text-field
						v-model="userInfo.username"
						label="Username"
						prepend-icon="mdi-account-circle"
						:rules="usernameRules"
					/>
					<v-text-field
						v-model="userInfo.email"
						label="Email"
						type="email"
						prepend-icon="mdi-account-circle"
					/>
					<v-text-field
						v-model="userInfo.password"
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="passwordRules"
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
			usernameRules: [
				(v) =>
					(v && v.length >= 5) ||
					"Votre pseudo doit contenir minimum 5 caractères.",
			],
			passwordRules: [
				(v) =>
					(v && v.length >= 6) ||
					"Doit contenir entre 6 et 20 caractères avec un caractère alphabétique, un caractère spécial et un chiffre.",
			],
		};
	},
	methods: {
		submitForm() {
			if (this.$refs.form.validate()) {
				axios
					.post("http://localhost:3000/api/users/register", this.userInfo)
					.then(() => {
						this.$store.dispatch("setSnackbar", {
							showing: true,
							text: `Vous êtes inscrit! Bienvenue.`,
						});
						this.$router.push("login");
					})
					.catch(() => {
						this.$store.dispatch("setSnackbar", {
							color: "error",
							showing: true,
							text: `Veuillez vérifier les données du formulaire.`,
						});
					});
			}
		},
	},
};
</script>
