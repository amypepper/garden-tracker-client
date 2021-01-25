import config from "../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  hasAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
};

export default TokenService;
