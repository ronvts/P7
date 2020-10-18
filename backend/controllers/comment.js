const db = require("../models");

exports.createComment = (req, res) => {
	db.User.findOne({
		attributes: ["id", "username", "email"],
		where: { id: req.userId },
	})
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur inconnu !" });
			}

			db.Message.findOne({
				where: { id: req.params.id },
			})
				.then((message) => {
					if (!message) {
						return res.status(401).json({ error: "Message inconnu !" });
					}

					db.Comment.create({
						content: req.body.content,
						MessageId: req.params.id,
						UserId: user.id,
					})
						.then((comment) => {
							return res
								.status(201)
								.json({ comment, message: "Commentaire créé !" });
						})
						.catch((error) => {
							console.log("0", error);
							return res.status(400).json({ error: "Pas de création" });
						});
				})
				.catch((error) => {
					res.status(400).json({ error: "Problème ici !" });
				});
		})
		.catch((error) => {
			res.status(500).json({ error: "Impossible !" });
		});
};

//Afficher comment
// exports.getComment = (req, res) => {
// 	db.Message.findOne({
// 		include: [
// 			{
// 				model: db.User,
// 				attributes: ["username"],
// 			},
// 		],
// 	})
// 		.then((message) => {
// 			if (!message) {
// 				return res.status(401).json({ error: "Message inconnu !" });
// 			}
// 			db.Comment.findAll({
// 				order: [["createdAt", "DESC"]],
// 				include: [
// 					{
// 						model: db.Message,
// 						as: "Message",
// 					},
// 				],
// 			})
// 				.then((comments) => {
// 					if (!comments) {
// 						return res
// 							.status(401)
// 							.json({ error: "Aucun commentaire trouvé !" });
// 					}
// 					res.status(200).json(comments);
// 				})
// 				.catch((error) => {
// 					res.status(400).json({ error: "Impossible !" });
// 				});
// 		})
// 		.catch((error) => {
// 			res.status(500).json({ error: "Erreur serveur" });
// 		});
// };

// Suppression comment
// exports.deleteComment = (req, res) => {
// 	db.User.findOne({
// 		attributes: ["id", "username", "email"],
// 		where: { id: userId },
// 	})
// 		.then((user) => {
// 			if (!user) {
// 				return res.status(401).json({ error: "Utilisateur inconnu !" });
// 			}

// 			db.Comment.findOne({
// 				where: { id: req.params.id },
// 			})
// 				.then((comment) => {
// 					if (!comment) {
// 						return res.status(401).json({ error: "Commentaire inconnu !" });
// 					}

// 					if (comment.userId !== userId) {
// 						return res.status(401).json({ error: "Action impossible !" });
// 					}

// 					db.Comment.destroy({
// 						attributes: ["id", "comment"],
// 						where: {
// 							id: id,
// 						},
// 					})
// 						.then((resultat) => {
// 							res.status(200).json({ success: "Commentaire supprimé !" });
// 						})
// 						.catch((error) => res.status(404).json({ error: "ici" }));
// 				})
// 				.catch((error) => res.status(404).json({ error: "par ici" }));
// 		})
// 		.catch((error) => res.status(404).json({ error: "non ici" }));
// };
exports.deleteComment = (req, res) => {
	db.Comment.destroy({
		where: { id: req.params.id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Message was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Message with id=${id}. Maybe message was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete message with id=" + id,
			});
		});
};
