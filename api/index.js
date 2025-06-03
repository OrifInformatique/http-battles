/**
 * Role:    Crée un server node.js
 * Date:    0.3.06.2025
 * 
 */

// importe et configure le èackage dotenv
require('dotenv').config()

// import le modul http de node.js
const http = require("http");

// importe l'application express
const app = require("./app");

// assure que le port est en format number ou string
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// défini le port suivant celui stoqué dans l'environnement ou celui en argument dans le process ou le défini comme 3000
const port = normalizePort(parseInt(process.env.PORT) || process.argv[3] || 3000);

//definit le port comme celuit de l'app express
app.set("port", port);

// récupère les erreur et défini un message personnaliser avant de términer le process si il s'agit d'une erreur de permission ou d'occupation
const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// crée le server avec l'app Express en paramettre
const server = http.createServer(app);

// ajoute la gestion d'erreur au server
server.on("error", errorHandler);

// construit le message qui s'affiche dans la console quand le server écoute une addresse
server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

// définit le port que l'address écoute
server.listen(port);