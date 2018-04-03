module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: false
        }
    };

    const sequelize = new Sequelize(
        config.db.name,
        config.db.user,
        config.db.password,
        options
    );

    const User = require('./user')(Sequelize, sequelize);

    return {
        user: User,

        sequelize: sequelize,
        Sequelize: Sequelize
    };
}