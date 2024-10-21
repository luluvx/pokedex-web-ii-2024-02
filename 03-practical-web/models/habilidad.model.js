module.exports = (sequelize, Sequelize) => {
    const Habilidad = sequelize.define("habilidad", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
    },{
        tableName: 'habilidades', 
        freezeTableName: true 
    });
    return Habilidad;
}