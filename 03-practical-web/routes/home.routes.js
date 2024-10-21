module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/home.controller.js");

    router.get('/holamundo', controller.holamundo);
    router.post('/concatenar', controller.concatenar);
    
    app.use('/', router);

};