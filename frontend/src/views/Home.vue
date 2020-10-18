<template>
	<v-main align="center">
		<v-container>
			<v-img class="logo mb-10" src="../assets/icon-left-font.png"></v-img>
			<v-btn to="/Login" class="mr-5" color="info">Connexion</v-btn>
			<v-btn to="/register" class="ml-5" color="info">Inscription</v-btn>
		</v-container>
	</v-main>
</template>

<script>
export default {
	name: "App",
	components: {},
};
</script>
<style scoped></style>
