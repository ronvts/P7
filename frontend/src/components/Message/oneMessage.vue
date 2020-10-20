<template>
	<v-container
		class="d-flex flex-column mx-auto my-10"
		justify-content="center"
		align="center"
	>
		<v-row>
			<v-col cols="12">
				<v-card
					class="mx-auto"
					align="center"
					min-width="40vw"
					max-width="70vw"
				>
					<v-list-item align="start" hover>
						<router-link :to="`/profile/${message.User.id}`">
							<v-list-item-avatar outlined color="grey darken-3">
								<v-img x-small :src="message.User.avatar"></v-img>
							</v-list-item-avatar>
						</router-link>

						<v-list-item-content>
							<v-list-item-title>{{ message.User.username }}</v-list-item-title>
							<v-list-item-title>{{ message.createdAt }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-row>
						<v-col>
							<v-card-title>{{ message.title }}</v-card-title>
							<v-card-text>{{ message.content }}</v-card-text>
							<v-img :src="message.attachment"></v-img>
						</v-col>
					</v-row>

					<v-card-actions align="center">
						<v-col>
							<v-tooltip top v-if="message.User.id === userId">
								<template v-slot:activator="{ on, attrs }">
									<v-btn v-bind="attrs" v-on="on" text color="green" small>
										<router-link
											:to="{
												name: 'updateMessage',
												params: { MessageId: message.id },
											}"
											class="color"
										>
											<v-icon>mdi-lead-pencil</v-icon>
										</router-link>
									</v-btn>
								</template>
								<span>Modifier</span>
							</v-tooltip>

							<v-tooltip
								top
								v-if="message.User.id === userId || isAdmin === true"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										@click.stop="dialog = true"
										v-bind="attrs"
										v-on="on"
										text
										color="red darken-2"
										small
									>
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Supprimer</span>
								<v-dialog v-model="dialog" max-width="500">
									<v-card>
										<v-card-title>
											Veuillez confirmer la suppression du message.
										</v-card-title>

										<v-card-actions @click="dialog = false">
											<v-spacer></v-spacer>

											<v-btn color="green darken-1" text>
												ANNULER
											</v-btn>

											<v-btn color="green darken-3" text @click="deleteMessage">
												Supprimer le message
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-tooltip>
						</v-col>
						<v-col>
							<v-tooltip top v-if="!isLiked">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon v-bind="attrs" v-on="on" @click="addLike">
										<v-icon size="1.8rem" color="green">
											mdi-thumb-up-outline
										</v-icon>
									</v-btn>
								</template>
								<span>J'aime</span>
							</v-tooltip>
							<v-tooltip top v-else-if="isLiked">
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon v-bind="attrs" v-on="on" @click="removeLike">
										<v-icon size="1.8rem" color="green">
											mdi-thumb-up
										</v-icon>
									</v-btn>
								</template>
								<span>J'aime</span>
							</v-tooltip>
							<span>{{ Likes.length }}</span>
						</v-col>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<v-col cols="12">
			<v-card
				class="mx-auto"
				min-width="350"
				max-width="70vw"
				v-for="comment in message.Comments"
				:key="comment.id"
			>
				<v-col v-if="comment.User.id == userId">
					<v-row justify="end" class="margin">
						<v-tooltip top>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									text
									color="red"
									small
									@click="deleteComment(comment.id)"
								>
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</template>
							<span>Supprimer</span>
						</v-tooltip>
					</v-row>
				</v-col>
				<router-link :to="`/profile/${comment.User.id}`">
					<v-list-item-avatar outlined color="grey darken-3">
						<v-img x-small :src="comment.User.avatar"></v-img>
					</v-list-item-avatar>
				</router-link>
				<v-card-text>{{ comment.User.username }} a commenté</v-card-text>
				<v-card-text class="color">{{ comment.content }}</v-card-text>
				<v-card-text class="end">à : {{ comment.createdAt }}</v-card-text>
			</v-card>
		</v-col>
		<v-col cols="12">
			<v-card class="mx-auto" min-width="350" max-width="70vw">
				<v-container>
					<v-card flat>
						<div>
							<v-form ref="form" @submit.prevent="commentSubmit()">
								<v-textarea
									outlined
									v-model="comment"
									type="text"
									placeholder="Votre commentaire..."
									required
								></v-textarea>
								<div class="commentSubBtn" align="center">
									<v-btn type="submit" small value="submit" color="info"
										>Poster un commentaire</v-btn
									>
								</div>
							</v-form>
						</div>
					</v-card>
				</v-container>
			</v-card>
		</v-col>
	</v-container>
</template>

<script>
import axios from "axios";
import $store from "@/store/index";
import { mapState } from "vuex";

export default {
	name: "oneMessage",
	components: {},
	data() {
		return {
			user: {},
			message: {
				User: {
					id: "",
					username: "",
					avatar: "",
				},
				Comments: [],
			},
			comment: "",
			Likes: [],
			isLiked: 0,
			dialog: false,
		};
	},
	created() {
		this.getLikes();
		axios
			.get("http://localhost:3000/api/messages/" + this.$route.params.id, {
				headers: {
					Authorization: `Bearer ${$store.state.token}`,
				},
			})
			.then((response) => {
				this.message = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
	methods: {
		updateComment(comment) {
			this.comments.unshift(comment);
		},
		deleteMessage() {
			this.dialog = false;
			axios
				.delete(
					"http://localhost:3000/api/messages/delete/" + this.$route.params.id,
					{
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					}
				)
				.then(() => {
					this.$store.dispatch("setSnackbar", {
						text: "Votre message a été supprimé.",
					});
					this.$router.push({
						name: "allMessages",
					});
				})
				.catch(() => {
					this.$store.dispatch("setSnackbar", {
						color: "error",
						text: "Impossible de supprimer le message.",
					});
				});
		},
		commentSubmit() {
			if (this.comment == null) {
				return false;
			}
			axios
				.post(
					"http://localhost:3000/api/messages/" +
						this.$route.params.id +
						"/comment/",
					{ content: this.comment },
					{
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					}
				)
				.then(() => {
					this.$store.dispatch("setSnackbar", {
						text: "Commentaire ajouté.",
					});
					window.location.reload(true);
				})
				.catch(() => {
					this.$store.dispatch("setSnackbar", {
						text: "Impossible d'ajouter votre commentaire.",
					});
				});
		},
		deleteComment(id) {
			axios
				.delete(
					"http://localhost:3000/api/messages/" +
						+this.$route.params.id +
						"/comment/" +
						id,
					{
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					}
				)
				.then(() => {
					this.$store.dispatch("setSnackbar", {
						text: "Commentaire supprimé.",
					});
					window.location.reload(true);
				})
				.catch(() => {
					this.$store.dispatch("setSnackbar", {
						color: "error",
						text: "Impossible de supprimer votre commentaire.",
					});
				});
		},
		getLikes() {
			axios
				.get(
					"http://localhost:3000/api/messages/" +
						+this.$route.params.id +
						"/like",
					{
						headers: {
							Authorization: `Bearer ${$store.state.token}`,
						},
					}
				)
				.then((response) => {
					this.Likes = response.data;

					for (let i = 0; i < this.Likes.length; i++) {
						if (this.Likes[i].UserId == $store.state.userId) {
							this.isLiked++;
							break;
						}
					}
				})
				.catch(() => {
					this.$store.dispatch("setSnackbar", {
						color: "error",
						text: "Erreur de chargement. Veuillez réessayer.",
					});
				});
		},
		addLike() {
			if (this.isLiked == 0) {
				const data = {
					UserId: $store.state.userId,
					MessageId: this.$route.params.id,
				};
				axios
					.post(
						"http://localhost:3000/api/messages/" +
							+this.$route.params.id +
							"/like",
						data,
						{
							headers: {
								Authorization: `Bearer ${$store.state.token}`,
							},
						}
					)
					.then((response) => {
						this.like = response.data;
						this.$store.dispatch("setSnackbar", {
							text: "Like ajouté !",
						});
						this.$router.go();
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				this.$store.dispatch("setSnackbar", {
					color: "error",
					text: "Veuillez réessayer.",
				});
			}
		},
		removeLike() {
			if (this.isLiked == 1) {
				axios
					.delete(
						"http://localhost:3000/api/messages/" +
							+this.$route.params.id +
							"/like",
						{
							headers: {
								Authorization: `Bearer ${$store.state.token}`,
							},
						}
					)
					.then((response) => {
						this.like = response.data;
						this.$store.dispatch("setSnackbar", {
							text: "Like supprimé.",
						});
						this.$router.go();
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
	computed: {
		...mapState(["isAdmin", "userId"]),
	},
};
</script>
