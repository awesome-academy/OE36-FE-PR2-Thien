import { ApiCore } from "apis/utils/core";
import { SHOWTIME_COLLECTION } from "constants/collections";

class ApiShowtime extends ApiCore {
  constructor() {
    super({
      collection: SHOWTIME_COLLECTION,
      get: true,
      getById: true,
      post: true,
      put: true,
      remove: true,
    });
  }
}

export default new ApiShowtime();
