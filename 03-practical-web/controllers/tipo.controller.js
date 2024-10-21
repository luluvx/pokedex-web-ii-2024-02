const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor

exports.listTipo = async (req, res) => {
    try {
        
        const tipos = await db.tipos.findAll();
        
        if(tipos.length === 0){
            res.status(404).json({
                msg: 'No hay tipos'
            });
            return
        }
        
        res.json(tipos);
    } catch (error) {
        sendError500(error);
    }
}

exports.getTipoById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }
        res.json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

exports.createTipo = async (req, res) => {
    
    const requiredFields = ['nombre'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {
        const tipo = {
            nombre: req.body.nombre
        }
        const tipoCreado = await db.tipos.create(tipo);
        res.status(201).json(tipoCreado);
        
    } catch (error) {
        sendError500(error);
    }    
}

exports.updateTipoPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }
        const nombre = req.body.nombre;
        if (nombre) {
            tipo.nombre = nombre;
        }
        await tipo.save();
        res.json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

exports.updateTipoPut = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }
        const requiredFields = ['nombre'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        tipo.nombre = req.body.nombre;
        await tipo.save();
        res.json(tipo);
    } catch (error) {
        sendError500(error);
    }
}

exports.deleteTipo = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }
        await tipo.destroy();
        res.json({
            msg: 'Tipo eliminado'
        });
    } catch (error) {
        sendError500(error);
    }
}

exports.uploadPictureTipo = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha subido ninguna imagen'
            });
            return;
        }
        const file = req.files.photoTipoPokemon;
        const fileName = tipo.id + '.jpg';
        file.mv(`public/tipos/${fileName}`);
        await tipo.save();
        res.json(tipo);

    } catch (error) {
        sendError500(error);
    }
}

exports.getPokemonesByTipoId = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await getTipoOr404(id, res);
        if (!tipo) {
            return;
        }
        const pokemones = await tipo.getPokemones();
        res.json(pokemones);
    } catch (error) {
        sendError500(error);
    }
}

async function getTipoOr404(id, res) {
    const tipo = await db.tipos.findByPk(id);
    if (!tipo) {
        res.status(404).json({
            msg: 'Tipo no encontrado'
        });
    }
    return tipo;
}
