const setToken = (accessToken?: string, refreshToken?: string): void => {
  accessToken && sessionStorage.setItem("accessToken", accessToken);
  refreshToken && sessionStorage.setItem("refreshToken", refreshToken);
};
const clearToken = (): void => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};
const removeAll = (): void => {
  sessionStorage.clear();
};

const getAccessToken = (): string | null => {
  return sessionStorage.getItem("accessToken");
};
const getRefreshToken = (): string | null => {
  return sessionStorage.getItem("refreshToken");
};
export { setToken, clearToken, getAccessToken, getRefreshToken, removeAll };
