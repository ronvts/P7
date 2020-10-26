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
	db.User.findOne({
		attributes: ["id", "email", "username", "isAdmin"],
		where: { id: req.userId },
	})
		.then((user) => {
			// Si l'utilisateur est le créateur OU admin dans la db, on supprime le commentaire
			if (user && (user.isAdmin == true || user.id == req.userId)) {
				db.Comment.findOne({
					where: { id: req.params.id },
				})
					.then((comment) => {
						db.Comment.destroy({
							where: { id: comment.id },
						})
							.then(() => res.end())
							.catch((err) => res.status(500).json(err));
					})
					.catch((err) => res.status(500).json(err));
				// Si l'utilisateur n'est pas le créateur ni admin
				// Status 403 : non autorisé
			} else {
				res.status(403).json("Non autorisé à supprimer ce commentaire");
			}
		})
		.catch((error) => res.status(500).json(console.log(error)));
};
