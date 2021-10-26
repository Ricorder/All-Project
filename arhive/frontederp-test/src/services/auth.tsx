import { config } from 'services/config';

interface LoginProps {
  name: string,
  pass: string
}

export const getToken = async  () =>{
  const response = await fetch('http://localhost:3005/api/v1/server', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })

  console.log('Response', response);

  // const addNewTodoFromServer = await response.json()
  // dispatch(addTodo(addNewTodoFromServer))
}

// console.log('GetToken',getToken);

export default class AuthService {
  constructor() {
  }

  private _ApiBase: string = `${config.url.API_URL}`;

  public async login({name, pass}: LoginProps) {
    const apiUrl = `${config.url.API_URL}/ServiceModel/AuthService.svc/Login`;
    const postData = JSON.stringify({"UserName": name, "UserPassword": pass});
    
    const res = await fetch(`${apiUrl}`,
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
    // console.log(res);
    if (!res.ok) {
      throw new Error(`Could not fetch login`);
    }
    return await res.json();
  }

  public async loginAD({name, pass}: LoginProps) {
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
}

