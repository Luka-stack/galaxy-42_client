let accessToken = '';

export function getJwtToken() {
  return accessToken;
  // return sessionStorage.getItem('jwt');
}

export function setJwtToken(token: string) {
  accessToken = token;
  // sessionStorage.setItem('jwt', token);
}
