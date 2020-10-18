<template>
	<v-container>
		<h2 align="center">Modifier votre message</h2>

		<v-card class="pa-10">
			<v-form
				ref="form"
				enctype="multipart/form-data"
				@submit.prevent="updateMsg"
			>
				<div>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								<v-text-field
									outlined
									v-model="title"
									label="Titre"
									type="text"
								></v-text-field>
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</div>

				<div>
					<input
						type="file"
						ref="file"
						@change="selectFile"
						name="image"
						label="Télécharger une image"
						prepend-icon="mdi-camera"
						outlined
						dense
					/>
				</div>

				<div>
					<v-textarea
						outlined
						v-model="content"
						label="Mon message"
						type="text"
					></v-textarea>
				</div>
				<div class="space">
					<label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
					<img size="100" v-if="imgPreview" :src="imgPreview" />
				</div>

				<div>
					<v-btn text color="green accent-5" type="submit" value="submit"
						>Poster</v-btn
					>
					<v-btn text color="red accent-4">Annuler</v-btn>
				</div>
			</v-form>
		</v-card>
	</v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import { mapState } from "vuex";

export default {
	name: "UpdateMessage",
	components: {},
	data() {
		return {
			title: "",
			content: "",
			file: "",
			imgPreview: "",
		};
	},

	methods: {
		selectFile() {
			this.file = this.$refs.file.files[0];
			this.imgPreview = URL.createObjectURL(this.file);
		},
		updateMsg() {
			const fd = new FormData();
			fd.append("title", this.title);
			fd.append("content", this.content);
			fd.append("inputFile", this.file);
			axios
				.put(
					"http://localhost:3000/api/messages/update/" + this.$route.params.id,
					fd,
					{
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					}
				)
				.then((res) => {
					console.log(res);
					this.$router.push({
						name: "allMessages",
					});
				})
				.catch((error) => {
					console.log("2", error);
				});
		},
	},
	computed: {
		...mapState(["isAdmin", "userId"]),
	},
};
</script>

<style scoped></style>
