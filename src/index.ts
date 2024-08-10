import JWT from "jsonwebtoken";
import { expressMiddleware } from "@apollo/server/express4";
import { Request, Response } from "express";
import createGqlServer from "./graphql/index";

//start gqlServer
async function init() {
  const express = require("express");

  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.json({ success: true });
  });

  const gqlServer = await createGqlServer();

  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req }) => {
        const token = req.headers["authorization"];
        return JWT.verify(token as string, "jwt-secret");
      },
    })
  );

  app.listen(PORT, () => console.log("Server listening on port", PORT));
}

init();
