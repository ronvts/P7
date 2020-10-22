<template>
	<v-app class="blue-grey lighten-5">
		<v-row class="my-10 mx-5">
			<v-col md="4" cols="12">
				<v-card class="mx-5">
					<v-list-item color="rgba(0, 0, 0, .4)">
						<v-list-item-content>
							<v-avatar contain height="600" class="pb-10" rounded>
								<v-img :src="user.avatar"></v-img>
							</v-avatar>
							<v-list-item-title class="title" align="center">
								{{ user.username }}
							</v-list-item-title>
							<v-list-item>{{ user.bio }}</v-list-item>
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
			<v-col md="8" cols="12" v-if="isAdmin == true && user.id !== userId">
				<v-btn @click.stop="dialog = true" color="red darken-2" dark
					>Supprimer le profil</v-btn
				>
				<v-dialog v-model="dialog" max-width="500">
					<v-card>
						<v-card-title>
							Êtes vous sûr de supprimer ce profil ?
						</v-card-title>

						<v-card-actions @click="dialog = false">
							<v-spacer></v-spacer>

							<v-btn color="green darken-1" text>
								Non
							</v-btn>

							<v-btn color="green darken-3" text @click="deleteProfile">
								Oui
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
			<v-col md="8" cols="12" v-if="user.id == userId">
				<v-form ref="form" @submit.prevent="updateProfile">
					<v-card class="mx-5">
						<v-card-text>
							<v-text-field
								v-model="bio"
								label="Ajouter une bio"
							></v-text-field>
						</v-card-text>
						<div class="my-5">
							<input
								type="file"
								ref="file"
								name="file"
								id="file"
								class="inputfile"
								@change="selectFile"
							/>
							<label for="file"
								><v-icon color="green darken-2" class="ml-5" hover
									>mdi-camera-plus</v-icon
								>
								Changer d'avatar</label
							>
						</div>
						<div class="space">
							<label v-if="imgPreview" for="preview">Aperçu de l'image:</label>
							<img contain height="400" v-if="imgPreview" :src="imgPreview" />
						</div>
						<v-card-actions>
							<v-btn type="submit" color="success">
								Sauvegarder
							</v-btn>
							<v-btn
								@click.stop="dialog = true"
								v-if="user.id === userId"
								color="red darken-2"
								dark
								>Supprimer le profil</v-btn
							>
							<v-dialog v-model="dialog" max-width="500">
								<v-card>
									<v-card-title>
										Êtes vous sûr de supprimer votre profil ?
									</v-card-title>

									<v-card-actions @click="dialog = false">
										<v-spacer></v-spacer>

										<v-btn color="green darken-1" text>
											Non
										</v-btn>

										<v-btn color="green darken-3" text @click="deleteProfile">
											Oui, je veux supprimer mon compte.
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-col>
		</v-row>
	</v-app>
</template>
<script>
import axios from "axios";
import $store from "@/store/index";
import { mapState } from "vuex";
export default {
	name: "Profile",
	data() {
		return {
			user: {},
			bio: "",
			avatar: "",
			file: "",
			imgPreview: "",
			dialog: false,
		};
	},
	mounted() {
		axios
			.get("http://localhost:3000/api/users/profile/" + this.$route.params.id, {
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
		updateProfile() {
			const fd = new FormData();
			fd.append("bio", this.bio);
			fd.append("inputFile", this.file);
			axios
				.put(
					"http://localhost:3000/api/users/profile/" + this.$route.params.id,
					fd,
					{
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					}
				)
				.then(() => {
					this.$store.dispatch("setSnackbar", {
						text: "Votre profil a été modifié.",
					});
					this.$router.go();
				})
				.catch((error) => {
					console.log(error);
				});
		},
		deleteProfile() {
			this.dialog = false;
			axios
				.delete(
					"http://localhost:3000/api/users/profile/" + this.$route.params.id,
					{
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					}
				)
				.then(() => {
					window.localStorage.vuex = JSON.stringify({});
					this.$store.dispatch("setSnackbar", {
						text: "Votre profil a été supprimé. A bientôt !",
					});
					this.$router.push("/");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	computed: {
		...mapState(["isAdmin", "userId"]),
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
