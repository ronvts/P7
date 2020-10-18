<template>
	<v-container>
		<h2 align="center">Nouveau message</h2>

		<v-card class="pa-10">
			<v-form ref="form" enctype="multipart/form-data" @submit.prevent="newMsg">
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

				<div class="space">
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
				<div class="space">
					<label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
					<img size="100" v-if="imgPreview" :src="imgPreview" />
				</div>

				<div class="space">
					<v-textarea
						outlined
						v-model="content"
						label="Mon message"
						type="text"
					></v-textarea>
				</div>

				<div class="space">
					<v-btn text color="green accent-5" type="submit" value="submit"
						>Poster</v-btn
					>
				</div>
			</v-form>
		</v-card>
	</v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";

export default {
	name: "newMessage",
	components: {},

	data() {
		return {
			title: "",
			content: "",
			file: "",
			imgPreview: "",
		};
	},

	mounted() {
		axios
			.get("http://localhost:3000/api/messages", {
				headers: {
					Authorization: `Bearer ${$store.state.token}`,
				},
			})
			.then((response) => {
				this.user = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},

	methods: {
		selectFile() {
			this.file = this.$refs.file.files[0];
			this.imgPreview = URL.createObjectURL(this.file);
		},
		newMsg() {
			if (this.title == null || this.content == null) {
				return false;
			}

			const fd = new FormData();
			fd.append("title", this.title);
			fd.append("content", this.content);
			fd.append("inputFile", this.file);
			console.log(fd);

			axios
				.post("http://localhost:3000/api/messages/create", fd, {
					headers: {
						Authorization: `Bearer ${$store.state.token}`,
					},
				})
				.then((res) => {
					console.log(res);
					this.$router.push({
						name: "allMessages",
					});
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

<style scoped></style>
