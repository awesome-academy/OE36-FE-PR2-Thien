import { apiProvider } from "./provider";

export class ApiCore {
  constructor(options) {
    if (options.get) {
      this.get = (filter) => {
        return apiProvider.getData(options.collection, filter);
      };
    }
    if (options.post) {
      this.post = (model) => {
        return apiProvider.post(options.url, model);
      };
    }
    if (options.put) {
      this.put = (model) => {
        return apiProvider.put(options.url, model);
      };
    }
    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.url, id);
      };
    }
  }
}
