const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.pokemones = require("./pokemon.model.js")(sequelize, Sequelize);
db.tipos = require("./tipo.model.js")(sequelize, Sequelize);
db.habilidades = require("./habilidad.model.js")(sequelize, Sequelize);


//many to many pokemon-tipo
db.pokemones.belongsToMany(db.tipos, {through: 'pokemon_tipos', as: 'tipos', foreignKey: 'pokemonId'});
db.tipos.belongsToMany(db.pokemones, {through: 'pokemon_tipos', as : 'pokemones', foreignKey: 'tipoId'});

//many to many pokemon-habilidad
db.pokemones.belongsToMany(db.habilidades, {through: 'pokemon_habilidades', as: 'habilidades',  foreignKey: 'pokemonId'});
db.habilidades.belongsToMany(db.pokemones, {through: 'pokemon_habilidades', as: 'pokemones', foreignKey: 'habilidadId'});

//AUTOREFERENCIAL
db.pokemones.belongsTo(db.pokemones, {foreignKey: 'idEvPrevia', as: 'evPrevia'});
db.pokemones.belongsTo(db.pokemones, {foreignKey: 'idEvSiguiente', as: 'evSiguiente'});


module.exports = db;