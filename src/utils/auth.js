class Auth {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.headers;
    this._authBaseUrl = config.authBaseUrl;
    this._authHeader = config.authHeader;
    this._token = localStorage.getItem("token");
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  authUser(data) {
    return fetch(`${this._authBaseUrl}/signin`, {
      method: "POST",
      headers: this._authHeader,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  registrationUser(data) {
    return fetch(`${this._authBaseUrl}/signup`, {
      method: "POST",
      headers: this._authHeader,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  checkedToken(jwt) {
    return fetch(`${this._authBaseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }
}

export const auth = new Auth({
  authBaseUrl: "https://api.mesto41.students.nomoredomains.sbs",
  authHeader: {
    "Content-Type": "application/json",
  },
});
