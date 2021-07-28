import { BANNER_COLLECTION } from "utils/constant";
import { ApiCore } from "apis/utils/core";

class ApiBanner extends ApiCore {
  constructor() {
    super({
      collection: BANNER_COLLECTION,
      get: true,
      //   post: true,
      //   put: true,
      //   remove: true,
    });
  }
}

export default new ApiBanner();
