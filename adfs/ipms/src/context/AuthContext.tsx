import React, { useContext, useState } from "react";
import cookie from "services/cookie";
import { config } from "services/config";

export interface ILoginProps {
  name: string;
  pass: string;
}

export interface ILoginResponse {
  Code: number;
  Exception: any;
  Message: string;
  PasswordChangeUrl: string;
  RedirectUrl: string;
}

export interface IAuthContextValue {
  isAuth: boolean;
  login: (loginProps: ILoginProps) => Promise<ILoginResponse>;
  ssoLogin: () => void;
  ntlmLogin:  (loginProps: ILoginProps) => Promise<ILoginResponse>;
}

const AuthContext = React.createContext({} as IAuthContextValue);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [isAuth, setIsAuth] = useState(document.cookie.includes("BPMCSRF")); // Признак аутентификации -- кука BPMCSRF, проставляемая старым бэком
  const redirectFrontTo = cookie.getCookie("redirect_front_to");
  if (redirectFrontTo === "ipms") { // Если мы вернулись после редиректа по IIS rewrite rule (после успешного логина?)
    cookie.setCookie("redirect_front_to","none"); // Очистить condition-cookie этого rewrite rule (чтобы открыть старый фронт)
  }

  async function login({name, pass}: ILoginProps): Promise<ILoginResponse> {
    const apiUrl = `${config.url.API_URL}/ServiceModel/AuthService.svc/Login`;
    const postData = JSON.stringify({"UserName": name, "UserPassword": pass});
    const res = await fetch(
      `${apiUrl}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': Buffer.byteLength(postData).toString()
        },
        credentials: 'include',
        body: postData
      }
    );
    if (!res.ok) {
      throw new Error(`Could not fetch login`);
    }
    const resData = await res.json();
    console.log(resData);
    
    if (resData.Code == 0) {
      setIsAuth(true);
    }
    return resData;
  }
  
  function ssoLogin() {
    cookie.setCookie("redirect_front_to","ipms"); // Поставить condition-cookie для IIS rewrite rule (редирект на IPMS после успешного логина)
    window.location.href = config.url.SSO_LOGIN_URL; // Редирект на SSO login page старого фронта
  }

  async function ntlmLogin({name, pass}: ILoginProps): Promise<ILoginResponse> {
    const myHeaders = new Headers();
    const apiUrl = `${config.url.API_URL}/Login/NuiLogin.aspx?ntlmlogin`;

    myHeaders.append("Authorization", 'Basic ' + btoa(name + ':' + pass));

    const res = await fetch(
      `${apiUrl}`,
      {
        credentials: "include",
        headers: myHeaders
      }
    );

    if (!res.ok) {
      throw new Error(`Could not fetch loginAD`);
    }

    return await res.json();
  }

  const value: IAuthContextValue = {
    isAuth,
    login,
    ssoLogin,
    ntlmLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}