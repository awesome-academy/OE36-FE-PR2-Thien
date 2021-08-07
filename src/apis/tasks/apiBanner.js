import { ApiCore } from "apis/utils/core";
import { BANNER_COLLECTION } from "constants/collections";

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
