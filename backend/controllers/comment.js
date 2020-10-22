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
