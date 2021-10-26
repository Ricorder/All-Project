import history from "services/history";
import cookie from "services/cookie";

class Auth {
  private _auth: boolean = false;
  private _history: any = history;
  private _cookie: any = cookie;

  constructor() {
    const authCookie = this._cookie.getCookie('__erpAuth');

    if (authCookie === '1' || document.cookie.includes("__erpAuth") 
    ||  document.cookie.includes("BPMCSRF")) {
      this._auth = true;
      this._cookie.setCookie('__erpAuth', '1');
    }
  }

  public login(data: [], cb?: Function) {
    console.log(data);
    
    this._auth = true;
    this._cookie.setCookie('__erpAuth', '1');

    if (cb !== undefined) {
      cb();
    }
  }

  public logout(cb?: Function) {
    if (this._auth === false) {
      return;
    }
    this._auth = false;
    this._cookie.setCookie('__erpAuth', '0');

    setTimeout(() => {
      this._history.push("/auth");
    }, 100);

    if (cb !== undefined) {
      cb();
    }
  }

  public isAuth(): boolean {
    return this._auth;
  }
}

export default new Auth();
