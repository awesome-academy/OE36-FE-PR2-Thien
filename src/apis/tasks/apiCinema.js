import { ApiCore } from "apis/utils/core";
import { CINEMAS_COLLECTION } from "constants/collections";

class ApiCinema extends ApiCore {
  constructor() {
    super({
      collection: CINEMAS_COLLECTION,
      getById: true,
      get: true,
      post: true,
      put: true,
      remove: true,
    });
  }
}

export default new ApiCinema();
