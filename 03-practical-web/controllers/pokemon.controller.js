const e = require("express");
const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
const { calcularRangoStats } = require("./PokemonStats");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor

exports.listPokemon = async (req, res) => {
    try {
        const pokemones = await db.pokemones.findAll({
            include:[
                {model: db.tipos,
                as: 'tipos',
                attributes: ['id', 'nombre'],
                through: {attributes: []}

                },
            ]
        })
        if(pokemones.length === 0){
            res.status(404).json({
                msg: 'No hay pokemones'
            });
            return
        }
        pokemones.sort((a, b) => parseFloat(a.nroPokedex) - parseFloat(b.nroPokedex));
        res.json(pokemones);
    } catch (error) {
        sendError500(error);
    }
}

exports.getPokemonById = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.getPokemonDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemones.findByPk(id, {
            include: ['tipos', 'habilidades']
        }
        );
        if (!pokemon) {
            res.status(404).json({
                msg: 'Pokemon no encontrado'
            });
            return;
        }
        res.json(pokemon);

    }catch(error){
        sendError500(error);
    }
}


exports.createPokemon = async (req, res) => {
    const pokemon = req.body;

    try{
        const pokemonCreado = await db.pokemones.create(pokemon);
        res.status(201).json(pokemonCreado);


    } catch (error) {
        sendError500(error);
    }

}

exports.updatePokemonPatch = async (req, res) => {
    const id = req.params.id;
    try{
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }

        pokemon.nombre = req.body.nombre || pokemon.nombre;
        pokemon.nroPokedex = req.body.nroPokedex || pokemon.nroPokedex;
        pokemon.descripcion = req.body.descripcion || pokemon.descripcion;
        pokemon.hp = req.body.hp || pokemon.hp;
        pokemon.attack = req.body.attack || pokemon.attack;
        pokemon.defense = req.body.defense || pokemon.defense;
        pokemon.spattack = req.body.spattack || pokemon.spattack;
        pokemon.spdefense = req.body.spdefense || pokemon.spdefense;
        pokemon.speed = req.body.speed || pokemon.speed;
        pokemon.nivelEvolucion = req.body.nivelEvolucion || pokemon.nivelEvolucion;
        pokemon.idEvPrevia = req.body.idEvPrevia || pokemon.idEvPrevia;
        pokemon.idEvSiguiente = req.body.idEvSiguiente || pokemon.idEvSiguiente;

        await pokemon.save();
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.updatePokemoEvolucion = async (req, res) => {
    const id = req.params.id;
    try{
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        pokemon.idEvPrevia = req.body.idEvPrevia || pokemon.idEvPrevia;
        pokemon.idEvSiguiente = req.body.idEvSiguiente || pokemon.idEvSiguiente;

        if (pokemon.idEvPrevia === id) {
            res.status(400).json({
                msg: 'El id de la evolución previa no puede ser igual al id del pokemon'
            });
            return;
        }if (pokemon.idEvSiguiente === id) {
            res.status(400).json({
                msg: 'El id de la evolución siguiente no puede ser igual al id del pokemon'
            });
            
        } if (pokemon.idEvPrevia === pokemon.idEvSiguiente || pokemon.idEvSiguiente === pokemon.idEvPrevia) {
            res.status(400).json({
                msg: 'El id de la evolución previa no puede ser igual al id de la evolución siguiente'
            });

        } else {
            await pokemon.save();
            res.json(pokemon);
        }

    } catch (error) {
        sendError500(error);
    }

}

exports.updatePokemonPut = async (req, res) => {
    const id = req.params.id;
    try{
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        const updatedPokemon = req.body;

        pokemon.nombre = updatedPokemon.nombre;
        pokemon.nroPokedex = updatedPokemon.nroPokedex;
        pokemon.descripcion = updatedPokemon.descripcion;
        pokemon.hp = updatedPokemon.hp;
        pokemon.attack = updatedPokemon.attack;
        pokemon.defense = updatedPokemon.defense;
        pokemon.spattack = updatedPokemon.spattack;
        pokemon.spdefense = updatedPokemon.spdefense;
        pokemon.speed = updatedPokemon.speed;
        pokemon.nivelEvolucion = updatedPokemon.nivelEvolucion;
        pokemon.idEvPrevia = updatedPokemon.idEvPrevia;
        pokemon.idEvSiguiente = updatedPokemon.idEvSiguiente;
        
        await pokemon.save();


        
        res.json(pokemon);
    } catch (error) {
        sendError500(error);
    }
}

exports.deletePokemon = async (req, res) => {
    const id = req.params.id;
    try{
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        await pokemon.destroy();
        res.json({
            msg: 'Pokemon eliminado'
        });
    } catch (error) {
        sendError500(error);
    }
}

exports.uploadPicturePokemon = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemones.findByPk(id);

        if (!pokemon) {
            res.status(404).json({
                msg: 'Pokemon no encontrado'
            });
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha subido ninguna imagen'
            });
            return;
        }
        
        const file = req.files.photoPokemon;
        const fileName = pokemon.id + '.jpg';
        file.mv(`public/pokemones/${fileName}`);
        await pokemon.save();
        res.json(pokemon);

    } catch (error) {
        sendError500(error);
    }
}

exports.getTiposByPokemonId = async (req, res) => {
    const id = req.params.id;
    const pokemon = await db.pokemones.findByPk(id, {
        include: 'tipos'
    });
    if (!pokemon) {
        res.status(404).json({
            msg: 'Pokemon no encontrado'
        });
        return;
    }
    res.json(pokemon.tipos);
}

// insertar tipos

exports.insertTipostoPokemon = async (req, res) => {
    try{
        const id = req.params.id;
        const pokemon = await db.pokemones.findByPk(id);


        if (!pokemon) {
            res.status(404).json({
                msg: 'Pokemon no encontrado'
            });
            return;
        }

        const tiposList = req.body.tipos;

        if(!Array.isArray(tiposList)){
            tiposList = [tiposList];
        }

        await pokemon.setTipos(tiposList);

        const updatedPokemon = await db.pokemones.findByPk(id, {
            include: 'tipos'
        });
        res.json(updatedPokemon.tipos);

    }catch(error){
        sendError500(error);
    }
}

exports.getHabilidadesByPokemonId = async (req, res) => {
    const id = req.params.id;
    const pokemon = await db.pokemones.findByPk(id, {
        include: 'habilidades'
    });

    if (!pokemon) {
        res.status(404).json({
            msg: 'Pokemon no encontrado'
        });
        return;
    }
    res.json(pokemon.habilidades);
}

exports.insertHabilidadestoPokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await db.pokemones.findByPk(id);


        if (!pokemon) {
            res.status(404).json({
                msg: 'Pokemon no encontrado'
            });
            return;
        }

        let habilidadesList = req.body.habilidades;

        if (!Array.isArray(habilidadesList)) {
            habilidadesList = [habilidadesList];
        }

        await pokemon.setHabilidades(habilidadesList);

        const updatedPokemon = await db.pokemones.findByPk(id, {
            include: 'habilidades'
        });
        res.json(updatedPokemon.habilidades);

    } catch (error) {
        sendError500(error);
    }

};


exports.getRangoStats = async (req, res) =>{
    try{
        const id = req.params.id;
        const pokemon = await db.pokemones.findByPk(id);

        if (!pokemon) {
            res.status(404).json({
                msg: 'Pokemon no encontrado'
            });
            return;
        }


        const rangoStats = calcularRangoStats(pokemon);

        const stats = [
            { nombre: 'HP', base: pokemon.hp, rango: rangoStats.hp, color: '#A0D683' },
            { nombre: 'Attack', base: pokemon.attack, rango: rangoStats.attack, color: '#FEFF9F' },
            { nombre: 'Defense', base: pokemon.defense, rango: rangoStats.defense, color: '#FFBD73' },
            { nombre: 'Sp. Atk', base: pokemon.spattack, rango: rangoStats.spAttack, color: '#BBE9FF' },
            { nombre: 'Sp. Def', base: pokemon.spdefense, rango: rangoStats.spDefense, color: '#D0BFFF' },
            { nombre: 'Speed', base: pokemon.speed, rango: rangoStats.speed, color: '#FFCDEA' }
          ];
        res.json(stats);

    }catch(error){
        sendError500(error);
    }

}

exports.getLineaEvolutiva = async (req, res) => {
    const id = req.params.id;

    try {
        // Buscar el Pokémon por su ID
        let pokemon = await db.pokemones.findByPk(id);
        if (!pokemon) {
            return res.status(404).json({
                msg: 'Pokemon no encontrado'
            });
        }

        // **Caso 0:** No tiene evolución previa ni siguiente
        if (pokemon.idEvPrevia === null && pokemon.idEvSiguiente === null) {
            return res.json([pokemon.id]);
        }

        // **Caso 1:** Es el Pokémon inicial (no tiene evolución previa)
        if (pokemon.idEvPrevia === null) {
            const lineaEvolutiva = [];
            lineaEvolutiva.push(pokemon.id);

            // Avanzar por las evoluciones siguientes
            while (pokemon.idEvSiguiente !== null) {
                pokemon = await db.pokemones.findByPk(pokemon.idEvSiguiente);
                lineaEvolutiva.push(pokemon.id);
            }

            return res.json(lineaEvolutiva);
        }

        // **Caso 2:** Es el Pokémon final (no tiene evolución siguiente)
        if (pokemon.idEvSiguiente === null) {
            const lineaEvolutiva = [];

            // Retroceder por las evoluciones previas
            while (pokemon.idEvPrevia !== null) {
                pokemon = await db.pokemones.findByPk(pokemon.idEvPrevia);
                lineaEvolutiva.push(pokemon.id);
            }

            // Invertimos el orden para tener el orden correcto
            lineaEvolutiva.reverse();
            lineaEvolutiva.push(id); // Agregar el Pokémon actual al final

            return res.json(lineaEvolutiva);
        }

        // **Caso 3:** Es un Pokémon intermedio (tiene evolución previa y siguiente)
        const lineaEvolutiva = [];

        // Retrocedemos hasta el Pokémon inicial
        let tempPokemon = pokemon;
        while (tempPokemon.idEvPrevia !== null) {
            tempPokemon = await db.pokemones.findByPk(tempPokemon.idEvPrevia);
            lineaEvolutiva.push(tempPokemon.id);
        }
        lineaEvolutiva.reverse(); // Invertir para tener el orden correcto

        // Agregamos el Pokémon actual
        lineaEvolutiva.push(pokemon.id);

        // Avanzamos hacia el Pokémon final
        tempPokemon = pokemon;
        while (tempPokemon.idEvSiguiente !== null) {
            tempPokemon = await db.pokemones.findByPk(tempPokemon.idEvSiguiente);
            lineaEvolutiva.push(tempPokemon.id);
        }

        return res.json(lineaEvolutiva);

        

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error interno del servidor'
        });
    }
};







async function getPokemonOr404(id, res) {
    const pokemon = await db.pokemones.findByPk(id);
    if (!pokemon) {
        res.status(404).json({
            msg: 'Pokemon no encontrado'
        });
    }
    return pokemon;
}