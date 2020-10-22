<template>
	<v-container>
		<v-card class="pa-10 mt-7">
			<h3 align="center" class="mb-3">Nouveau message</h3>
			<v-form ref="form" enctype="multipart/form-data" @submit.prevent="newMsg">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title>
							<v-text-field
								outlined
								v-model="title"
								label="Titre"
								type="text"
								:rules="titleRules"
							></v-text-field>
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<div>
					<input
						type="file"
						ref="file"
						name="file"
						id="file"
						class="inputfile"
						@change="selectFile"
					/>
					<label for="file"
						><v-icon color="green darken-2" hover>mdi-camera-plus</v-icon>
						Ajouter une image</label
					>
				</div>
				<div>
					<label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
					<img contain height="500" v-if="imgPreview" :src="imgPreview" />
				</div>
				<div class="mt-5">
					<v-textarea
						outlined
						v-model="content"
						label="Mon message"
						type="text"
						:rules="contentRules"
					></v-textarea>
				</div>
				<div align="center">
					<v-btn
						align="center"
						color="cyan darken-2"
						type="submit"
						value="submit"
						dark
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
			titleRules: [(v) => (v && v.length >= 3) || "Veuillez ajouter un titre."],
			contentRules: [
				(v) => (v && v.length >= 3) || "Veuillez ajouter un message.",
			],
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
			const fd = new FormData();
			fd.append("title", this.title);
			fd.append("content", this.content);
			fd.append("inputFile", this.file);

			if (this.$refs.form.validate()) {
				axios
					.post("http://localhost:3000/api/messages/create", fd, {
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					})
					.then(() => {
						this.$store.dispatch("setSnackbar", {
							text: "Votre message a été posté",
						});
						this.$router.push({
							name: "allMessages",
						});
					})
					.catch(() => {
						this.$store.dispatch("setSnackbar", {
							color: "error",
							text: "Veuillez réessayer.",
						});
					});
			}
		},
	},
};
</script>

<style scoped>
.inputfile {
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.inputfile + label {
	font-weight: 500;
	display: inline-block;
	cursor: pointer;
}

.inputfile:focus + label,
.inputfile + label:hover {
	background-color: #effbff;
}
</style>
