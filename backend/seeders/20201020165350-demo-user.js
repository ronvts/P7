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
		return queryInterface.bulkInsert("Users", [
			{
				id: "1",
				username: "Admin",
				email: "admin@gmail.com",
				password:
					"$2b$10$89IBWEgRxNsvS92veG33huTiFLlQhO6QxFoyzGHcccBtroKYs1OUe",
				avatar: "http://localhost:3000/images/cat.jpg",
				isAdmin: true,
				bio: "Veuillez compléter votre profil...",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "2",
				username: "Camille",
				email: "camille@gmail.com",
				password:
					"$2b$10$89IBWEgRxNsvS92veG33huTiFLlQhO6QxFoyzGHcccBtroKYs1OUe",
				avatar: "http://localhost:3000/images/portrait-camille.jpg",
				isAdmin: false,
				bio: "Veuillez compléter votre profil...",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "3",
				username: "Damien",
				email: "damien@gmail.com",
				password:
					"$2b$10$89IBWEgRxNsvS92veG33huTiFLlQhO6QxFoyzGHcccBtroKYs1OUe",
				avatar: "http://localhost:3000/images/avatar.png",
				isAdmin: false,
				bio: "Veuillez compléter votre profil...",
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
		return queryInterface.bulkDelete("Users", null, {});
	},
};
