const db = require("../models");
const fs = require("fs");

exports.getAllMessages = (req, res) => {
	db.Message.findAll({
		include: [
			{
				model: db.User,
				attributes: ["username", "avatar"],
			},
			{
				model: db.Comment,
				required: false,
				attributes: ["content", "id"],
				include: [
					{
						model: db.User,
						attributes: ["username", "avatar", "id"],
					},
				],
			},
			{
				model: db.Like,
				required: false,
			},
		],
		order: [["createdAt", "DESC"]],
	})
		.then((messages) => res.status(200).json(messages))
		.catch((error) => res.status(500).json({ error }));
};

exports.getOneMessage = (req, res) => {
	db.Message.findOne({
		where: { id: req.params.id },
		include: [
			{
				model: db.User,
				attributes: ["id", "username", "avatar"],
			},
			{
				model: db.Comment,
				required: false,
				attributes: ["id", "content", "createdAt"],
				include: [
					{
						model: db.User,
						attributes: ["username", "avatar", "id"],
					},
				],
				order: [["createdAt", "DESC"]],
			},
		],
	})
		.then((message) => {
			if (!message) {
				return res.status(400).json({ error: "Message non disponible !" });
			}
			res.status(200).json(message);
		})
		.catch((error) => {
			res.status(400).json({ error });
		});
};

exports.create = (req, res) => {
	db.User.findOne({
		where: { id: req.userId },
	})
		.then((user) => {
			if (user !== null) {
				let attachment;
				if (req.file != undefined) {
					attachment = `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`;
				} else {
					attachment == null;
				}
				if (req.body.content == "" && req.file == undefined) {
					res.status(400).json({ error: "Il n'y a aucun contenu à ajouter !" });
				} else {
					db.Message.create({
						title: req.body.title,
						content: req.body.content,
						attachment: attachment,
						UserId: user.id,
					})
						.then((newMsg) => {
							res.status(201).json(newMsg);
						})
						.catch((err) => {
							res.status(500).json(err);
						});
				}
			} else {
				res.status(400).json(error);
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: "erreur serveur" });
		});
};

//Modification message
exports.update = (req, res) => {
	const id = req.params.id;

	const data = req.file
		? {
				title: req.body.title,
				content: req.body.content,
				userId: req.body.userId,
				attachment: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: {
				title: req.body.title,
				content: req.body.content,
				userId: req.body.userId,
		  };

	db.Message.findByPk(id).then((message) => {
		const filename = message.attachment
			? {
					name: message.attachment.split("3000/")[1],
			  }
			: {
					name: message.attachment,
			  };
		fs.unlink(`images/${filename.name}`, () => {
			db.Message.update(data, {
				where: { id: id },
			})
				.then((num) => {
					if (num == 1) {
						res.send({
							message: "Le message a été mis à jour.",
						});
					} else {
						res.send({
							message: "Erreur lors de la mise à jour de ce message",
						});
					}
				})
				.catch((err) => {
					res.status(500).send({
						message: "Impossible de mettre à jour ce message",
					});
				});
		});
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	db.Message.findByPk(id)
		.then((message) => {
			const filename = message.attachment
				? {
						name: message.attachment.split("3000/")[1],
				  }
				: {
						name: message.attachment,
				  };
			fs.unlink(`images/${filename.name}`, () => {
				db.Message.destroy({
					where: { id: id },
				})
					.then((num) => {
						if (num == 1) {
							res.send({
								message: "Message effacé.",
							});
						} else {
							res.send({
								message: "Erreur lors de la supression du message",
							});
						}
					})
					.catch((err) => {
						res.status(500).send({
							message: "Impossible de supprimer ce message.",
						});
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

// Ajouter un like
exports.addLike = (req, res) => {
	const like = {
		MessageId: req.body.MessageId,
		UserId: req.userId,
	};
	db.Like.create(like)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Impossible de liker cet article.",
			});
		});
};

// Récupérer les likes d'un message
exports.getAllLikes = (req, res) => {
	db.Like.findAll({ where: { MessageId: req.params.id } })
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => res.status(500).json({ error }));
};

// Ajouter un dislike
exports.removeLike = (req, res) => {
	db.Like.findOne({ where: { UserId: req.userId, MessageId: req.params.id } })
		.then((like) => {
			like
				.destroy()
				.then(() => res.status(200).json({ message: "like annulé !" }))
				.catch((error) => {
					console.log("2", error);
					res.status(404).json({ error });
				});
		})

		.catch((error) => {
			console.log("1", error);
			res.status(500).json({ error });
		});
};
