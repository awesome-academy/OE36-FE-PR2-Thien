import { ApiCore } from "apis/utils/core";
import { USERS_COLLECTION } from "constants/collections";

class ApiUser extends ApiCore {
  constructor() {
    super({
      collection: USERS_COLLECTION,
      get: true,
      post: true,
      put: true,
      remove: true,
    });
  }
}

export default new ApiUser();
