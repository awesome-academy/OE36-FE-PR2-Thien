import { IMAGE_COLLECTION } from "utils/constant";
import { ApiCore } from "apis/utils/core";

class ApiUploadImage extends ApiCore {
  constructor() {
    super({
      collection: IMAGE_COLLECTION,
      upload: true,
    });
  }
}

export default new ApiUploadImage();
