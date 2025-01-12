export type TypeFetchAuthTokenRefreshData = {
  refreshToken: string,
  accessToken: string,
};

export type TypeFetchAuthTokenVerifyResponse = {
  accessToken: string,
};

export type TypeFetchGetProfileResponse = {
  _id: string,
  firstName: string,
  secondName: string,
  avatarSrc: string,
}
