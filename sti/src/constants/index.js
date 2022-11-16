export const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
export const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
export const ACCESS_TOKEN = 'accessToken';

// export const OAUTH2_REDIRECT_URI = `${CLIENT_BASE_URL}/oauth/redirect`;
export const OAUTH2_REDIRECT_URI = `${CLIENT_BASE_URL}`;

export const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;
