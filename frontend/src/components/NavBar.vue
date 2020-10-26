<template>
	<v-app-bar app color="#01627F" dark>
		<v-tooltip>
			<template v-slot:activator="{ on, attrs }">
				<v-btn class="mx-2" to="/messages" icon v-bind="attrs" v-on="on">
					<v-icon>
						mdi-home
					</v-icon>
				</v-btn>
			</template>
			<span>Accueil</span>
		</v-tooltip>
		<v-tooltip>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-if="$store.state.isLogged"
					to="/messages/new"
					icon
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>
						mdi-email-plus
					</v-icon>
				</v-btn>
			</template>
			<span>Poster un message</span>
		</v-tooltip>
		<v-spacer></v-spacer>
		<v-tooltip>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-if="$store.state.isLogged"
					@click="myProfile"
					icon
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>
						mdi-account
					</v-icon>
				</v-btn>
			</template>
			<span>Mon profil</span>
		</v-tooltip>
		<v-tooltip>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					class="mx-2"
					v-if="$store.state.isLogged"
					@click="logout"
					icon
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>
						mdi-logout
					</v-icon>
				</v-btn>
			</template>
			<span>Déconnexion</span>
		</v-tooltip>
	</v-app-bar>
</template>

<script>
export default {
	methods: {
		logout() {
			window.localStorage.vuex = JSON.stringify({});
			this.$router.push("/");
			this.$store.dispatch("setSnackbar", {
				text: "Déconnexion réussie.",
			});
		},
		myProfile() {
			if (this.$route.path == `/profile/${this.$store.state.userId}`) {
				window.location.reload();
			} else {
				this.$router.push(`/profile/${this.$store.state.userId}`);
			}
		},
	},
};
</script>
