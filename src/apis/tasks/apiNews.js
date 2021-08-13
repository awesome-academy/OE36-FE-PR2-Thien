import { ApiCore } from "apis/utils/core";
import { NEWS_COLLECTION } from "constants/collections";

class ApiMovie extends ApiCore {
  constructor() {
    super({
      collection: NEWS_COLLECTION,
      get: true,
      getById: true,
    });
  }
}

export default new ApiMovie();
