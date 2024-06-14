const SYSTEM_NAME = "theJapan";
class CacheKey {
  static REFRESH_TOKEN = `${SYSTEM_NAME}-refreshToken-key`;
  static ACCESS_TOKEN = `${SYSTEM_NAME}-accessToken-key`;
  static USER_INFO = `${SYSTEM_NAME}-userInfo-key`;
}

export default CacheKey;
