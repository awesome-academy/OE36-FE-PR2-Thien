import { BASE_URL_DEVELOPMENT, BASE_URL_PRODUCTION } from "constants/common";

var APIConfig = {
    development: BASE_URL_DEVELOPMENT,
    production: BASE_URL_PRODUCTION
}

export default APIConfig[process.env.NODE_ENV];