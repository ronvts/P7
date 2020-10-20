"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here

			models.Like.belongsTo(models.Message);
			models.Like.belongsTo(models.User);
		}
	}
	Like.init(
		{
			UserId: {
				type: DataTypes.INTEGER,
			},
			MessageId: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: "Like",
		}
	);
	return Like;
};
