let accessToken = '';

export function getJwtToken() {
  return accessToken;
}

export function setJwtToken(token: string) {
  accessToken = token;
}
