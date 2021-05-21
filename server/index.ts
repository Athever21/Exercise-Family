import express, { Response } from "express";
import { promises as fs, readFileSync } from "fs";
import path from "path";
import template from "./template";
import https from "https";

const cwd = process.cwd();
const app = express();

let src = `<script src="/build/dist.js"></script>`;
if (process.env.NODE_ENV === "production") {
  src = "";
  (async () => {
    const dir = await fs.readdir(path.join(cwd, "build"));
    for (const filename of dir) {
      if (filename.includes("dist") && !filename.includes(".txt")) {
        src += `\n\t<script src="/build/${filename}"></script>`;
      }
    }
  })();
} else {
  require("./devBundle").default(app);
}

app.use("/build/", express.static(path.join(cwd, "build")));
app.get("*", (_, res: Response) => {
  return res.send(template(src));
});

const PORT = process.env.PORT || 3000;

const credentials = {
  key: readFileSync(path.join(cwd,"server","selfsigned.key")),
  cert: readFileSync(path.join(cwd,"server","selfsigned.crt")),
};

const server = https.createServer(credentials, app);

server.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`));
