const http = require("http");

const server = http.createServer((req, res) => {
    res.end("ok");
});

server.listen(3000, () => {
    console.log("Bare Node server listening on 3000");
});

process.on("beforeExit", () => console.log("beforeExit fired"));