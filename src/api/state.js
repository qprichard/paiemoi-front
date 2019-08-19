import { APIEndpoint } from "api";
import config from "config/config";
import User from "models/user";

const { PAIEMOI_API } = config;

export const users = new APIEndpoint(`${PAIEMOI_API}/users`, User);
