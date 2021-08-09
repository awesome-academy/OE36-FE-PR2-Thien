import { adminRoutes } from "routers/routesConfig";

export default function checkBaseName(path) {
  return path.indexOf(adminRoutes.home.path) >= 0;
}
