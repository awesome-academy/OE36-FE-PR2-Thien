import { ApiCore } from "apis/utils/core";

class ApiAuth extends ApiCore {
  constructor() {
    super({
      get: true,
      post: true,
      put: true,
      remove: true,
    });
  }
  login(account) {
    return this.post(account, 'login');
  }

  signup(account) {
    return this.post(account, 'signup');
  }
}

export default new ApiAuth();
