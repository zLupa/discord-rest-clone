import http from "http";

import { app } from "./shared/infra/http/app";
import { io } from "./shared/infra/websocket/io";

const server = http.createServer(app);

// I will work on this later
/* io.attach(server, {
  cors: {
    origin: "*",
  },
});
*/

server.listen(3333, () => console.log("> Server is ready"));
