exports.holamundo = (req, res) => {
    const respuesta = {
        mensaje: "Hola Mundo"
    };
    res.json(respuesta);
}
exports.concatenar = (req, res) => {
    const var1 = req.body.var1;
    const var2 = req.body.var2;
    const respuesta = {
        mensaje: var1 + " " + var2
    };
    res.json(respuesta);
}