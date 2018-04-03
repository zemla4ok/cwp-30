module.exports = (Sequelize, sequeize) => {
    return sequeize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: Sequelize.STRING,
        password: sequeize.STRING,
        codes: Sequelize.STRING
    })
}