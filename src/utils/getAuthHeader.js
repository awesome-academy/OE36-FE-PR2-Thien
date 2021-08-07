export default function getAuthHeader() {
  const token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).account
  ).token;
  return token ? { "Authorization": "Bearer " + token } : {};
}
