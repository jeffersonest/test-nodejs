import * as dotenv from "dotenv";
import "reflect-metadata";
import "./config/dependency-injection.config";
import { container } from "tsyringe";
import App from "./app";

dotenv.config();
const server = container.resolve<App>("App");
server.start();
