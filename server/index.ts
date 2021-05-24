import express, { Response } from "express";
import { promises as fs, readFileSync } from "fs";
import path from "path";
import template from "./template";
import https from "https";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
require("dotenv").config();

import getAuthorization from "./utils/auth";
import errorHandler from "./utils/errorHandler";
import userRouter from "./routers/userRouter";
import authRouter from "./routers/authRouter";
import familyRouter from "./routers/familyRouter";

const cwd = process.cwd();
const app = express();

(async () => {
  try {
    const url = (process.env.NODE_ENV === "test") ? "mongodb://localhost/familyTest" : process.env.MONGODB_URL;
    await mongoose.connect(url as string, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
})();

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
}

if (process.env.NODE_ENV === "development") {
  require("./devBundle").default(app);
}

app.use(cookieParser());
app.use(express.json());
app.use("/build/", express.static(path.join(cwd, "build")));
// @ts-ignore
app.use(getAuthorization);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/family", familyRouter);
app.get("*", (_, res: Response) => {
  return res.send(template(src));
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const credentials = {
  key: readFileSync(path.join(cwd, "server", "selfsigned.key")),
  cert: readFileSync(path.join(cwd, "server", "selfsigned.crt")),
};

export const server = https.createServer(credentials, app);

server.listen(PORT, () => console.log(`Server listening at PORT ${PORT}`));
