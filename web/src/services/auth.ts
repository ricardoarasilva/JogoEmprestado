export const TOKEN_KEY  = "jogo-emprestado-token";

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token:string) => {
  localStorage.setItem(TOKEN_KEY,token);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
} 