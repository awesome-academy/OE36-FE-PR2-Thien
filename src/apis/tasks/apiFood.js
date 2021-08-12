import { ApiCore } from "apis/utils/core";
import { FOOD_COLLECTION } from "constants/collections";

class ApiFood extends ApiCore {
  constructor() {
    super({
      collection: FOOD_COLLECTION,
      get: true,
    });
  }
}

export default new ApiFood();
