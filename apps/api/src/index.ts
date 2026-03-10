import "dotenv/config";
import { buildServer } from "./server.js";

const server = buildServer({ logger: true })

server.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});