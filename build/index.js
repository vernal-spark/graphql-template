"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express4_1 = require("@apollo/server/express4");
const index_1 = __importDefault(require("./graphql/index"));
//start gqlServer
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const express = require("express");
        const app = express();
        const PORT = 3000;
        app.use(express.json());
        app.get("/", (req, res) => {
            res.json({ success: true });
        });
        const gqlServer = yield (0, index_1.default)();
        app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                const token = req.headers["authorization"];
                return jsonwebtoken_1.default.verify(token, "jwt-secret");
            }),
        }));
        app.listen(PORT, () => console.log("Server listening on port", PORT));
    });
}
init();
