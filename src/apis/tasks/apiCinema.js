import { ApiCore } from "apis/utils/core";
import { CINEMAS_COLLECTION } from "utils/constant";

class ApiCinema extends ApiCore {
  constructor() {
    super({
      collection: CINEMAS_COLLECTION,
      get: true,
      post: true,
      put: true,
      remove: true,
    });
  }
}

export default new ApiCinema();
