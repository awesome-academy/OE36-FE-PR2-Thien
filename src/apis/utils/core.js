import { apiProvider } from "./provider";

export class ApiCore {
  constructor(options) {
    if (options.get) {
      this.get = (filter) => {
        return apiProvider.get(options.collection, filter);
      };
    }
    if (options.post) {
      this.post = (model, collection) => {
        return apiProvider.post(collection || options.collection, model);
      };
    }
    if (options.put) {
      this.put = (id, model) => {
        return apiProvider.put(options.collection, id, model);
      };
    }
    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.collection, id);
      };
    }
    if (options.upload) {
      this.upload = (files) => {
        return apiProvider.upload(options.collection, files);
      };
    }
  }
}
