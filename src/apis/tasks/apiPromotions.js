import { ApiCore } from "apis/utils/core";
import { PROMOTION_COLLECTION } from "constants/collections";

class ApiPromotion extends ApiCore {
  constructor() {
    super({
      collection: PROMOTION_COLLECTION,
      get: true,
      getById: true,
    });
  }
}

export default new ApiPromotion();
