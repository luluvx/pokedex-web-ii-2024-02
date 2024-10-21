module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemon.controller.js");

    router.get('/', controller.listPokemon);
    router.get('/:id', controller.getPokemonById);
    router.get('/:id/details', controller.getPokemonDetails);
    router.post('/', controller.createPokemon);
    router.put('/:id', controller.updatePokemonPut);
    router.patch('/:id', controller.updatePokemonPatch);
    router.patch('/:id/evolucion', controller.updatePokemoEvolucion);
    router.delete('/:id', controller.deletePokemon);

    router.post('/:id/photo', controller.uploadPicturePokemon);

    router.get('/:id/tipos', controller.getTiposByPokemonId);
    router.post('/:id/tipos', controller.insertTipostoPokemon);

    router.get('/:id/habilidades', controller.getHabilidadesByPokemonId);
    router.post('/:id/habilidades', controller.insertHabilidadestoPokemon);

    router.get('/:id/rangoStats', controller.getRangoStats);
    
    router.get('/:id/lineaEvolutiva', controller.getLineaEvolutiva);


    app.use('/pokemones', router);
}