<template>
	<v-app-bar app color="#01627F" dark>
		<v-toolbar-title class="d-flex align-center">
			<v-btn to="/messages" text>Accueil</v-btn>
		</v-toolbar-title>
		<v-btn v-if="$store.state.isLogged" text to="/messages/new"
			>Poster un message</v-btn
		>
		<v-spacer></v-spacer>
		<div>
			<v-btn v-if="$store.state.isLogged" @click="myProfile">
				<v-icon class="mr-1"> mdi-account </v-icon></v-btn
			>
			<v-btn v-if="$store.state.isLogged" text class="mr-2" @click="logout"
				>Déconnexion</v-btn
			>
		</div>
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
