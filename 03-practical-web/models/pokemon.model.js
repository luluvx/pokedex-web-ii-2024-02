module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nroPokedex:{
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hp: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        attack: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        defense: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spattack: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        spdefense: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        speed: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nivelEvolucion: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idEvPrevia: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        idEvSiguiente: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        


    });
    return Pokemon;
}