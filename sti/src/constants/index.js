export const API_BASE_URL = 'https://k7a401.p.ssafy.io'
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = `${API_BASE_URL}/oauth2/redirect`;

export const GOOGLE_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
