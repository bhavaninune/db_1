const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'psai2670@',
	{
		dialect: 'mysql',
		host: 'localhost'
	});

module.exports = sequelize;