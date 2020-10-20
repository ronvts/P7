<template>
	<v-app>
		<NavBar />
		<v-main class="blue-grey lighten-5">
			<router-view />
		</v-main>
		<SnackBar />
	</v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import SnackBar from "@/components/SnackBar";
export default {
	name: "App",
	components: {
		NavBar,
		SnackBar,
	},
};
</script>
