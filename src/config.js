module.exports = {
  PORT: process.env.PORT || 8080,
  API_TOKEN: process.env.REACT_APP_API_TOKEN,
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api",
};
