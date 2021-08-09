import { ApiCore } from "apis/utils/core";
import { IMAGE_COLLECTION } from "constants/collections";

class ApiUploadImage extends ApiCore {
  constructor() {
    super({
      collection: IMAGE_COLLECTION,
      upload: true,
    });
  }
}

export default new ApiUploadImage();
