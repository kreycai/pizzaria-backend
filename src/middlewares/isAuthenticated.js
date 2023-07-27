"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    //receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        //validar token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        //pegando id do token e colocando dentro de uma variavel dentro do req.
        req.user_id = sub;
        return next();
    }
    catch (error) {
        return res.status(401).end();
    }
}
exports.isAuthenticated = isAuthenticated;
