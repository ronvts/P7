<template>
	<v-app>
		<NavBar />
		<v-main>
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
