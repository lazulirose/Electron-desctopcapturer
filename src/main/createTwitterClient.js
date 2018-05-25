class TwitterClient {

  constructor(oauth, oauthAccessToken, oauthAccessSecret) {
    this.oauth = oauth;
    this.oauthAccessToken = oauthAccessToken;
    this.oauthAccessSecret = oauthAccessSecret;
  }

  // アカウント検証処理
  verifyCredentials() {
    return new Promise((resolve, reject) => {
      this.oauth.get(
        "https://api.twitter.com/1.1/account/verify_credentials.json",
        this.oauthAccessToken,
        this.oauthAccessSecret,
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  // メディアアップロード処理
  uploadMedia(params) {
    return new Promise((resolve, reject) => {
      this.oauth.post(
        "https://upload.twitter.com/1.1/media/upload.json",
        this.oauthAccessToken,
        this.oauthAccessSecret,
        params,
        "application/x-www-form-urlencoded",
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  // ツイート処理
  updateStatuses(params) {
    return new Promise((resolve, reject) => {
      this.oauth.post(
        "https://api.twitter.com/1.1/statuses/update.json",
        this.oauthAccessToken,
        this.oauthAccessSecret,
        params,
        "application/x-www-form-urlencoded",
        (error, data) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(JSON.parse(data));
          }
        }
      );
    });
  }
}

function createTwitterClient(oauth, oauthAccessToken, oauthAccessSecret) {
  return new TwitterClient(oauth, oauthAccessToken, oauthAccessSecret);
}

export default createTwitterClient;
