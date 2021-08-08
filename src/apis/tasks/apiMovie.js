import { ApiCore } from "apis/utils/core";
import { MOVIES_COLLECTION } from "constants/collections";

class ApiMovie extends ApiCore {
  constructor() {
    super({
      collection: MOVIES_COLLECTION,
      get: true,
      getById: true,
      post: true,
      put: true,
      remove: true,
    });
  }

  getNowShowingMovies(filter = { _limit: 4 }) {
    const currentDate = new Date().getTime();
    return this.get({
      ...filter,
      showing_from_date_lte: currentDate,
      showing_to_date_gte: currentDate,
    });
  }

  getComingSoonMovies(filter = { _limit: 4 }) {
    const currentDate = new Date().getTime();
    return this.get({
      ...filter,
      showing_from_date_gte: currentDate,
    });
  }
}

export default new ApiMovie();
