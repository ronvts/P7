"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert("Messages", [
			{
				UserId: "1",
				title: "Bonjour !",
				content: "Bienvenue sur le nouveau réseau social de l'entreprise :)",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "2",
				title: "Lorem Ipsum.",
				content:
					"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
				attachment: "http://localhost:3000/images/img1.jpg",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				UserId: "3",
				title: "Nam nec ultrices justo.",
				content:
					"Nullam feugiat tincidunt nulla, vel consectetur purus suscipit quis. Aenean placerat eros a orci maximus suscipit fermentum at metus. Nulla scelerisque finibus nunc consequat suscipit.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete("Messages", null, {});
	},
};
