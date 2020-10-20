<template>
	<v-snackbar
		v-model="snackbar.showing"
		align="center"
		:timeout="3000"
		class="pb-10"
		:color="snackbar.color"
		justify-content="space-between"
	>
		{{ snackbar.text }}
		<template v-slot:action="{ attrs }">
			<v-btn text v-bind="attrs" @click="snackbar.showing = false"
				>Fermer</v-btn
			>
		</template>
	</v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState(["snackbar"]),
	},
};
</script>

<style></style>
