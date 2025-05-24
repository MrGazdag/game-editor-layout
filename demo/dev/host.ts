import express, {RequestHandler} from "express";

const project = "Game Editor Layout Demo";
const app = express();
const hostname = process.env.SERVER_HOST ?? "0.0.0.0";
const port = process.env.SERVER_PORT ?? "5000";

app.use(express.static("dist"));

let server = app.listen(parseInt(port), hostname,() => {
    console.log(`"${project}" server listening on http://${hostname == "0.0.0.0" ? "localhost" : hostname}:${port}/`);
});

process.on('SIGINT', () => {
    console.log('Stopping "' + project + '" server');
    server.close(() => {
        console.log('"' + project + '" server stopped');
    });
})