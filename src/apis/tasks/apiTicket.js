import { ApiCore } from "apis/utils/core";
import { TICKET_COLLECTION } from "constants/collections";

class ApiTicket extends ApiCore {
  constructor() {
    super({
      collection: TICKET_COLLECTION,
      get: true,
      getById: true,
      post: true,
      put: true,
      remove: true,
    });
  }
}

export default new ApiTicket();
