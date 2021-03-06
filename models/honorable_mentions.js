/* eslint-disable new-cap */
module.exports = (sequelize, DataTypes) => {
	const hms = sequelize.define('honorable_mentions', {
		name: {
			type: DataTypes.STRING(2048),
			defaultValue: '',
		},
		writeup: {
			type: DataTypes.STRING(10000),
			defaultValue: '',
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	});

	hms.associate = models => {
		hms.belongsTo(models.categories, {foreignKey: 'categoryId', as: 'category'});
		models.categories.hasMany(hms);
	};

	return hms;
};
